JiffGif = {};

JiffGif.setup = function(r) {
    State = {
        Intro : 0,
        Loading : 1,
        Results : 2,
        Empty : 3,
        Failed : 4,
    }

    //TODO: implement other apis
    Api = {
        Tenor : 0
    }

    var api = Api.Tenor;
    var API_KEY_TENOR = {TENOR_KEY};
    var currentTimeout = null;

    $('document').ready(function() {
        setup(r);
    });

    var setup = function(rootView) {
        r = rootView;
        r.find('#search').on('keyup keypress', function(e) {
            var keyCode = e.keyCode || e.which;

            if (currentTimeout != null) {
                clearTimeout(currentTimeout);
                currentTimeout = null;
            }

            if (keyCode === 13) { 
                performSearch();
                e.preventDefault();
                return false;
            } 
            else {
                currentTimeout = setTimeout(performSearch, 400);
            }
        });

        r.find('#jiff-icon').click(function() {
            r.find('#search').val('jiff gif');
            performSearch();
        });

        r.find('#dark-toggle').change(function(){
            var checked = $(this).prop('checked');
            toggleDarkMode(checked);
        });
        
        setState(State.Intro);
        var jiffThemeSetting;
        chrome.storage.local.get('jiffThemeSetting', function(result){
            jiffThemeSetting = result.jiffThemeSetting;

            if(jiffThemeSetting == 'dark'){
                toggleDarkMode(true);
                $('#dark-toggle').bootstrapToggle('on');
            }
        });

        r.find('#search').focus();
    }

    var performSearch = function() {
        var term = r.find('#search').val();
        
        if (term.length > 0) {
            search(term);
        }
        else {
            setState(State.Intro);
        }
    }

    var search = function(query) {
        query = query.trim();
        clearGifs();
        setState(State.Loading);

        switch (api) {
            case Api.Tenor:
                url = 'https://api.tenor.co/v1/search?tag=' + escapeTerm(query) + '&limit=50&key=' + API_KEY_TENOR;
                parser = parseTenorResponse;
                break;
            default:
                throw 'invalid API';
        }

        $.ajax({
            url: url,
            success: function( result ) { setGifs(query, parser(result)); },
            failure: function (error) { setState(State.Failed); },
            beforeSend: function(xhr) { xhr.setRequestHeader('accept', 'image/webp,image/apng,image/*,*/*;q=0.8'); },
        });
    };

    var escapeTerm = function(term) {
        return term.split(' ').map(encodeURIComponent).join('+');
    }

    var parseTenorResponse = function(response) {
        return response.results.map(function(result) {
            var media = result.media[0];
            return createGifObj(media.tinywebm.url, media.gif.url, Api.Tenor, result.id, media.tinygif.url, media.tinygif.dims);
        });
    }

    var createGifObj = function(webmurl, gifurl, api, id, tinygif, tinydims) {
        return {
            webmurl : webmurl,
            gifurl : gifurl,
            api : api,
            id : id,
            tinygif : tinygif,
            tinydims : tinydims,
        };
    }

    var setState = function(state) {
        r.find('#intro').toggle(state == State.Intro || state == State.Failed);
        r.find('#loader').toggle(state == State.Loading);
        r.find('#gifs-container').toggle(state == State.Results);
        r.find('#gifs-empty').toggle(state == State.Empty);
    }

    var clearGifs = function() {
        r.find('.gif_column').empty();
    }

    var setGifs = function(searchTerm, gifs) {
        if (gifs.length == 0) {
            setState(State.Empty);
            return;
        }

        setState(State.Results);

        var columns = r.find('.gif_column');

        // TODO append based on height instead of round robin

        for (var i = 0; i < gifs.length; i++) {
            var container = columns[i % columns.length];

            var element = createGif(searchTerm, gifs[i]);
            container.append(element);
        }

        r.find('.save_btn').tooltip({delay: { 'show': 500, 'hide': 100 }, title: 'Save to disk'});
        r.find('.copy_btn').tooltip({delay: { 'show': 500, 'hide': 100 }, title: 'Copy URL'});
        r.find('.copy_github_btn').tooltip({delay: { 'show': 500, 'hide': 100 }, title: 'Copy Github markdown'});
    }

    var createGif = function(searchTerm, gif) {
        var tinywebm = gif.webmurl;
        var gifUrl = gif.gifurl;
        var githubMarkdown = '!['+ searchTerm + '](' + gifUrl + ')';

        var div = 
            $('<div class="card">' + 
                '<div class="card-image row">' +
                    '<img src="' + gif.tinygif + '" class="col-12" css="min-height: 100px;">' +
                '</div>' + 
                '<div class="card-content gif-actions row justify-content-center my-1">' + 
                    '<div class="copy_btn mr-2"><i class="far fa-copy action-icon"></i></div>' +
                    '<div class="copy_github_btn mr-2"><i class="fab fa-github action-icon"/></i></div>' + 
                    '<div class="save_btn mr-2"><i class="fas fa-file-download action-icon"></i></div>' + 
                '</div>' + 
            '</div>');

        div.find('.save_btn').click(function() {
            downloadFile(gifUrl, searchTerm + '.gif');
            registerShare(gif);
        });
        div.find('.copy_btn').click(function() {
            copyToClipboard(gifUrl);
            registerShare(gif);
        });
        div.find('.copy_github_btn').click(function() {
            copyToClipboard(githubMarkdown);
            registerShare(gif);
        });

        // TODO set the gif height accurately so the placeholder doesn't change size

        return div[0];
    }

    var registerShare = function(gif) {
        switch (gif.api) {
            case Api.Tenor:
                $.ajax({url: 'https://api.tenor.co/v1/registershare?id=' + gif.id + '&key=' + API_KEY_TENOR});
                break;
        }
    }

    var copyToClipboard = function(text) {
        var aux = document.createElement('input');
        aux.setAttribute('value', text);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand('copy');
        document.body.removeChild(aux);
        $('#copy-toast').toast('show');
    }

    var downloadFile = function(url, filename) {
        chrome.downloads.download({
            url: url,
            filename: filename
        });
        $('#download-toast').toast('show');
    }
}

var toggleDarkMode = function(checked) {
    var jiffThemeSetting;
    if(checked){
        $('body').addClass('dark');
        $('#jiff-icon').attr('src',"/icons/jiff-gif-white.png");
        jiffThemeSetting = 'dark';
    }
    else{
        $('body').removeClass('dark');
        $('#jiff-icon').attr('src','/icons/jiff-gif.png');
        jiffThemeSetting = 'light';
    } 
    chrome.storage.local.set({jiffThemeSetting});
}
