// taken from http://ramblings.mcpher.com/Home/excelquirks/gassnips/svgtopng
/**
  * converts an svg string to base64 png using the domUrl
  * @param {string} svgText the svgtext
  * @param {number} [margin=0] the width of the border - the image size will be height+margin by width+margin
  * @param {string} [fill] optionally backgrund canvas fill
  * @return {Promise} a promise to the bas64 png image
  */
var svgToPng = function (svgText, margin, fill) {
    // convert an svg text to png using the browser
    console.log('savePNG')
    return new Promise(function (resolve, reject) {
        try {
            // can use the domUrl function from the browser
            var domUrl = window.URL || window.webkitURL || window;
            if (!domUrl) {
                throw new Error("(browser doesnt support this)")
            }

            // figure out the height and width from svg text
            var match = svgText.match(/height=\"(\d+)/m);
            var height = match && match[1] ? parseInt(match[1], 10) : 200;
            height = 4000;
            var match = svgText.match(/width=\"(\d+)/m);
            var width = match && match[1] ? parseInt(match[1], 10) : 200;
            width = 4000;
            margin = margin || 0;

            // it needs a namespace
            if (!svgText.match(/xmlns=\"/mi)) {
                svgText = svgText.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
            }

            // create a canvas element to pass through
            var canvas = document.createElement("canvas");
            canvas.width = height + margin * 2;
            canvas.height = width + margin * 2;
            var ctx = canvas.getContext("2d");


            // make a blob from the svg
            var svg = new Blob([svgText], {
                type: "image/svg+xml;base64"
            });
            console.log( 'SVG', svg)
            // create a dom object for that image
            var url = domUrl.createObjectURL(svg);
            console.log( 'SVG URL', url)
            // create a new image to hold it the converted type
            var img = new Image;
            console.log( 'ONLOAD', img)
            // when the image is loaded we can get it as base64 url
            img.onload = function () {
                // draw it to the canvas
               
                ctx.drawImage(this, margin, margin);
                
                // if it needs some styling, we need a new canvas
                if (fill) {
                    var styled = document.createElement("canvas");
                    styled.width = canvas.width;
                    styled.height = canvas.height;
                    var styledCtx = styled.getContext("2d");
                    styledCtx.save();
                    styledCtx.fillStyle = fill;
                    styledCtx.fillRect(0, 0, canvas.width, canvas.height);
                    styledCtx.strokeRect(0, 0, canvas.width, canvas.height);
                    styledCtx.restore();
                    styledCtx.drawImage(canvas, 0, 0);
                    canvas = styled;
                }



                // we don't need the original any more
                domUrl.revokeObjectURL(url);
                // now we can resolve the promise, passing the base64 url
                resolve(canvas.toDataURL("image/png"));
                console.log(canvas.toDataURL("image/png"))
            };

            // load the image
            img.src = url;

        } catch (err) {
            reject('failed to convert svg to png ' + err);
        }
    });
};

export default svgToPng;