let vide = ['01','02','00','10','11','12','20','21','22']
let xo = [
    ['V','V','V'],
    ['V','V','V'],
    ['V','V','V']
]
let PassX = true
let PassO = true


function makeX(id){
    fX = Number(id[0])
    sX = Number(id[1])
    if (xo[fX][sX] == 'V' && PassX){
        // Pass = false
        x = document.getElementById(id)
        x.innerText='X'
        x.classList.remove('ivlbl')
        xo[fX][sX] = 'X' 
        vide.splice(vide.indexOf(id),1)
        checkall()
        makeO()
    }
}


//-----------------------------------------------------
//                O manual AI XD
//-----------------------------------------------------

function makeO(){
    if (!PassO){return ''}
    req = []
    for(i=0;i<=2;i++){
        ndx = checkForO([...xo[i]])
        if (ndx != -1){
            if (ndx[1] == 'X'){
                req.push(String(i) + String(ndx[0]))
            }else{
                return doO(String(i) + String(ndx[0]))
            }
            
        }
        line = yline(i)
        ndx = checkForO([...line])
        if (ndx != -1){
            if (ndx[1] == 'X'){
                req.push(String(ndx[0]) + String(i))
            }else{
                return doO(String(ndx[0]) + String(i))
            }
        }
    }

    z1 = [xo[0][0],xo[1][1],xo[2][2]]
    ndx = checkForO([...z1])
    if (ndx != -1){
        if (ndx[1] == 'X'){
            req.push(String(ndx[0]) + String(ndx[0]))
        }else{
            return doO(String(ndx[0]) + String(ndx[0]))
        }
        
    }
    z1 = [xo[0][2],xo[1][1],xo[2][0]]
    ndx = checkForO([...z1])
    if (ndx != -1){
        if(ndx[1] == 'X'){
            (ndx[0] == 0)?req.push('02'):((ndx[0]==1)?req.push('11'):req.push('20'))
        }else{
            if (ndx[0] == 0){
                return doO('02')
            }else if(ndx[0]==1){
                return doO('11')
            }else{
                return doO('20')
            }
        }
    }

    if(req.length!=0){
        doO(req[Math.floor(Math.random() * req.length)])
    }else{
        randomO()
    }
}

function doO(id){
    o = document.getElementById(id)
    fO = Number(id[0])
    sO = Number(id[1])
    o.innerText = 'O'
    o.classList.remove('ivlbl')
    xo[fO][sO] = 'O'
    vide.splice(vide.indexOf(id),1)
    checkall()
}

function randomO(){
    id = vide[Math.floor(Math.random() * vide.length)]
    doO(id)
}


function checkForO(lst){
    if(lst.includes('V')){
        ndx = lst.indexOf('V')
        lst.splice(ndx,1)
        if(lst.includes('V')){
            return -1
        }else if (!lst.includes('O')){
            return [ndx,'X']
        }else if (!lst.includes('X')){
            return [ndx,'O']
        }else{
            return -1
        }
    }else{
        return -1
    }
}
function yline(i){
    line = []
    for(j=0;j<=2;j++){
        line.push(xo[j][i])
    }
    return line
}
//-----------------------------------------------------


function checkall(){
    for(i=0;i<=2;i++){
        minicheck(xo[i])
        line = yline(i)
        minicheck(line)
    }
    z1 = [xo[0][0],xo[1][1],xo[2][2]]
    minicheck(z1)
    z2 = [xo[0][2],xo[1][1],xo[2][0]]
    minicheck(z2)
    if (vide.length==0){
        return getwinner('Draw')
    }
}
function minicheck(lst){
    if(lst.includes('V')){
        return -1
    }else if(!lst.includes('X')){
        return getwinner('O')
    }else if(!lst.includes('O')){
        return getwinner('X')
    }
}

function reset(){
    xo = [
        ['V','V','V'],
        ['V','V','V'],
        ['V','V','V']
    ]
    vide = ['01','02','00','10','11','12','20','21','22']
    for (i of document.getElementsByClassName('xo')){
        i.innerText = ''
        i.classList.add('ivlbl')
    }
    PassO = true
    PassX = true
}


function getwinner(winner){
    PassO = false
    PassX = false
    if (winner == 'O'){
        o = document.getElementById('oscore')
        n = Number(o.innerText) + 1
        o.innerText = n
    }else if(winner == 'X'){
        x = document.getElementById('xscore')
        n = Number(x.innerText) + 1
        x.innerText = n
    }
    setTimeout(reset, 3000)
    
}
