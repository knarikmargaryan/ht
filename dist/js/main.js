function solve(data, k) {
    if (k == null) k = 1;

    var size = data.length;
    var last = size - 4;

    var path = `M${data[0]},${data[1]}`;

    for (var i = 0; i < size - 2; i += 2) {
        var x0 = i ? data[i - 2] : data[0];
        var y0 = i ? data[i - 1] : data[1];

        var x1 = data[i + 0];
        var y1 = data[i + 1];

        var x2 = data[i + 2];
        var y2 = data[i + 3];

        var x3 = i !== last ? data[i + 4] : x2;
        var y3 = i !== last ? data[i + 5] : y2;

        var cp1x = x1 + ((x2 - x0) / 6) * k;
        var cp1y = y1 + ((y2 - y0) / 6) * k;

        var cp2x = x2 - ((x3 - x1) / 6) * k;
        var cp2y = y2 - ((y3 - y1) / 6) * k;

        path += ` C${cp1x},${cp1y},${cp2x},${cp2y},${x2},${y2}`;
    }

    return path;
}

window.onload = () => {
    var ming = "http://www.w3.org/2000/svg";
    var oSvg = document.getElementById("svg");
    var oPolyLine = null;
    let painting = false;
    var tween = KUTE;
    var pointsNum = [];
    var box = document.getElementById("box");
    box.appendChild(createTag("svg", { xmlns: ming }));
    oSvg.onmousedown = event => {
        if (oPolyLine) {
            oSvg.removeChild(oPolyLine);
        }

        painting = true;
        var x = event.clientX - box.offsetLeft;
        var y = event.clientY - box.offsetTop;

        oPolyLine = createTag("path", {
            id: "drawn",
            fill: "none",
            stroke: "black",
            "stroke-width": 2
        });
        oSvg.appendChild(oPolyLine);
        pointsNum.push(x, y);
    };
    ///Mobile
    oSvg.ontouchstart = event => {
        if (oPolyLine) {
            oSvg.removeChild(oPolyLine);
        }

        painting = true;
        var x = event.touches[0].clientX - box.offsetLeft;
        var y = event.touches[0].clientY - box.offsetTop;

        oPolyLine = createTag("path", {
            id: "drawn",
            fill: "none",
            stroke: "black",
            "stroke-width": 2
        });
        oSvg.appendChild(oPolyLine);
        pointsNum.push(x, y);
    };

    oSvg.onmousemove = event => {
        if (oPolyLine && painting) {
            let a = event.clientX - box.offsetLeft;
            let b = event.clientY - box.offsetTop;
            pointsNum.push(a, b);
            oPolyLine.setAttribute("d", solve(pointsNum, 1.5));
        }
    };
    //mobile
    oSvg.ontouchmove = event => {
        if (oPolyLine && painting) {
            let a = event.touches[0].clientX - box.offsetLeft;
            let b = event.touches[0].clientY - box.offsetTop;
            pointsNum.push(a, b);
            oPolyLine.setAttribute("d", solve(pointsNum, 1.5));
        }
    };

    oSvg.onmouseup = event => {
        painting = false;
        pointsNum = [];
        setTimeout(() => {
            tween.to("#drawn", { path: "#star" }).start();
        }, 1000);
    };
    //Mobile
    oSvg.ontouchend = event => {
        painting = false;
        pointsNum = [];
        setTimeout(() => {
            tween.to("#drawn", { path: "#star" }).start();
        }, 1000);
    };

    oSvg.onmouseleave = event => {
        if (painting) {
            painting = false;
            pointsNum = [];
            setTimeout(() => {
                tween.to("#drawn", { path: "#star" }).start();
            }, 1000);
        }
    };

    oSvg.ontouchcancel = event => {
        if (painting) {
            painting = false;
            pointsNum = [];
            setTimeout(() => {
                tween.to("#drawn", { path: "#star" }).start();
            }, 1000);
        }
    };

    function createTag(tagName, tagAttr) {
        var tag = document.createElementNS(ming, tagName);
        for (let attr in tagAttr) {
            tag.setAttribute(attr, tagAttr[attr]);
        }
        return tag;
    }
};