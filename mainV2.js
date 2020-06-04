
// let l = [5,6,3,1,4,9,8,2,7,10];

// function runSimulation(speed, size){

    let drawQueue = [];
    let calculationQueue = [];
    let allowPlay = false;
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    function createFrame(l, customInfo = {}) {
        let frame = {
            arr: l,
            customInfo: customInfo
        }
        return frame;
    }
    
    async function delayedDraw(l, customInfo = {}) {
        let frame = createFrame(l, customInfo);
        drawGrid(frame);
        if (!allowPlay) {
            return;
        }
    
        if(document.getElementById("speed").value > 5 || Math.random() > 0.3){
    
            await sleep(document.getElementById("speed").value);
        }
    
    }
    
    async function flourish(l){
        let customInfo = {};
        for (let i = 0; i < l.length; i++) {
            const element = l[i];
            customInfo[i] = "#ffa500";
            if(!allowPlay){
                return;
            }
            await delayedDraw(l,customInfo)
        }
        await delayedDraw(l, customInfo);
        await delayedDraw(l);
    }
    
    
    async function bubbleSort(l) {
        for (let i = 0; i < l.length; i++) {
            let hasSwapped = false;
            for (let j = 0; j < l.length - i; j++) {
                if (!allowPlay) {
                    break;
                }
    
                const element = l[j];
    
                if (l[j - 1] > l[j]) {
                    let temp = l[j - 1];
                    l[j - 1] = l[j]
                    l[j] = temp;
                    hasSwapped = true;
    
                }
                let customInfo = {};
                customInfo[j] = "#e06666";
                await delayedDraw(l,customInfo);
                // console.log(allowPlay);
    
    
    
            }
            if (!hasSwapped) {
                break;
            }
    
        }
        return l;
    }
    
    
    
    // https://www.guru99.com/quicksort-in-javascript.html
    async function swap(l, leftIndex, rightIndex) {
        var temp = l[leftIndex];
        l[leftIndex] = l[rightIndex];
        l[rightIndex] = temp;
    }
    async function partition(l, left, right) {
        
        var pivotIndex = Math.floor((right + left) / 2)
        var pivot = l[pivotIndex], //middle element
            i = left, //left pointer
            j = right; //right pointer
        while (i <= j) {
            while (l[i] < pivot) {
                i++;
            }
            while (l[j] > pivot) {
                j--;
            }
            if (i <= j) {
                swap(l, i, j); //swapping two elements
                i++;
                j--;
                let customInfo = {};
                customInfo[i] = "#93c47d";
                customInfo[j] = "#93c47d";
                customInfo[pivotIndex] = "#e06666";
                if(!allowPlay){
                    return;
                }
                await delayedDraw(l, customInfo);
            }
        }
        return i;
    }
    
    async function quickSort(l, left = -1, right = -1) {
       
        if (left === -1 || right === -1) {
            left = 0;
            right = l.length - 1;
        }
        var index;
        if (l.length > 1) {
            index = await partition(l, left, right); //index returned from partition
            if (left < index - 1) { //more elements on the left side of the pivot
                await quickSort(l, left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
                await quickSort(l, index, right);
            }
        }
        return l;
    }
    
    async function mergeSort(l, start = -1, end = -1) {
        // console.log(l);
        if (start == -1 || end == -1) {
            start = 0;
            end = l.length;
        }
        // console.log(`[${l}], [${l.slice(start, end)}], ${start}:${end}`);
        if (Math.abs(start - end) <= 1) {
            return l;
        }
    
    
        let middleIndex = Math.floor((start + end) / 2);
    
        await mergeSort(l, start, middleIndex);
        // .slice(start, middleIndex);
        await mergeSort(l, middleIndex, end);
        // .slice(middleIndex, end);
        // let left = l.slice(start,middleIndex);
        // let right = l.slice(middleIndex, end);
        // console.log(`${l}${'\n'}[${left}]:[${right}]  [${l.slice(start, end)}]`)
    
    
        // CREATING THE RESULTANT ARRAY
        let leftIndex = start;
        let rightIndex = middleIndex;
        let resultArray = [];
    
        while (leftIndex < middleIndex && rightIndex < end) {
            let leftItem = l[leftIndex], rightItem = l[rightIndex];
            // console.log(leftItem + " " + rightItem);
            if (leftItem < rightItem) {
                resultArray.push(leftItem);
                leftIndex++;
            }
            else {
                resultArray.push(rightItem);
                rightIndex++;
            }
        }
        while(leftIndex < middleIndex){
            resultArray.push(l[leftIndex]);
            leftIndex ++;
        }
        while(rightIndex < end){
            resultArray.push(l[rightIndex]);
            rightIndex ++;
        }
        // resultArray = 
        // resultArray.concat(left.slice(leftIndex).concat(right.slice(rightIndex)));
    
        
        // REPLACING THE ORIGINAL ARRAY
        for (let i = 0; i < resultArray.length; i++) {
            const element = resultArray[i];
            l[start + i] = element;
            let customInfo = {};
            customInfo[start + i] = "#e06666";
            if(!allowPlay){
                return;
            }
            await delayedDraw(l,customInfo);
        }
    
        // console.log(`RESULT ARRAY:[${resultArray}], [${left.slice(leftIndex)}], [${right.slice(rightIndex)}]`);
        // console.log("\n");
    
    
    
    
        return true;
    
    }
    
    function randomList(size) {
        let myList = [];
        while (myList.length < size) {
            let r = getRandomInt(size) + 1
            if (myList.includes(r)) {
                continue;
            }
            myList.push(r);
        }
        return myList
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    async function doSort(list) {
        
        switch (getCurrentMethod()) {
            case "bubbleSort":
                await bubbleSort(list);
                break;
            case "quickSort":
                await quickSort(list);
                break;
            case "mergeSort":
                await mergeSort(list);
                break;
                // delayedDraw(list);
    
            default:
                break;
        }
        flourish(list);
    };
    
    function setMethod(id) {
        ["btn1", "btn2", "btn3"].forEach(element => {
            document.getElementById(element).classList.remove("selected");
        });
        document.getElementById(id).classList.add("selected");
    
    };
    
    function getCurrentMethod() {
        var val = "bubbleSort";
        ["btn1", "btn2", "btn3"].forEach(element => {
            if (document.getElementById(element).classList.contains("selected")) {
                switch (element) {
                    case "btn1":
                        val = "bubbleSort";
                        break;
                    case "btn2":
                        val = "quickSort";
                        break;
                    case "btn3":
                        val = "mergeSort";
                        break;
                }
            }
    
        });
        return val;
    }
    
    
    
    let mainList = randomList(10);
    let hasRandomized = true;
    
    
    
    
    
    var runClick = function () {
        // clearTimeout(delayedDrawExecution);
        // clearTimeout(play);
        // clearTimeout(flourishPlay);
        let s = document.getElementById("size").value;
        if(hasRandomized == false){
            mainList = randomList(s);
            hasRandomized = true;
    
        }
        allowPlay = !allowPlay;
        console.log(allowPlay);
        if (allowPlay) {
            document.getElementById("run").innerHTML = "STOP";
            setTimeout(() => {
                doSort(mainList);
            }, 0);
            // hasRandomized = false;
        }
        else {
            document.getElementById("run").innerHTML = "RUN";
            // console.log(s);
        }
    };
    
    let onSlideChange = function(){
        // allowPlay = false;
        resetClick();
        drawGrid(createFrame(mainList));
        document.getElementById("run").innerHTML = "RUN";
        console.log(allowPlay);
    }
    
    let resetClick = function(){
        hasRandomized = true;
        allowPlay = false;
        mainList = randomList(document.getElementById("size").value);
        drawGrid(createFrame(mainList));
        document.getElementById("run").innerHTML = "RUN";
    }
    
    function init() {
        document.getElementById("run").onclick = runClick;
        document.getElementById("reset").onclick = resetClick;
        // document.getElementById("shuffle").onclick = shuffle;
        document.getElementById("size").oninput = onSlideChange;
        const buttons = document.getElementsByClassName("selectBtn");
        for (let i = 0; i < buttons.length; i++) {
            const element = buttons[i];
            let id = element.id;
            let idMethod = id.slice(-1);
            element.onclick = function () {
                setMethod(id);
            }
        }
        drawGrid(createFrame(mainList));
    
    }
    window.onload = function () {
        init();
        // runClick();
    };
    
    
    
    function drawGrid(l) {
        const c = document.getElementById("mainCanvas");
        const ctx = c.getContext("2d");
        ctx.translate(0.5,0.5);
        ctx.canvas.width = window.innerHeight;
        ctx.canvas.height = window.innerHeight;
        const height = c.height;
        const width = c.width;
        const size = l.arr.length;
        const heightQuotient = (height / size);
        const widthQuotient = (width / size);
        ctx.beginPath();
        ctx.fillStyle = "#2b2b2b";
        ctx.fillRect(0, 0, width, height);
    
        for (let i = 0; i < size; i++) {
            const element = l.arr[i];
            ctx.fillStyle = "#ffffff";
            if (i in l.customInfo) {
                ctx.fillStyle = l.customInfo[i];
            }
            ctx.fillRect(i * widthQuotient, height, widthQuotient+1, -element * heightQuotient+0.5);
            // ctx.fillRect(i * widthQuotient + 0.5, height, widthQuotient + 0.5, -element * heightQuotient);
        };
        ctx.closePath();
    }