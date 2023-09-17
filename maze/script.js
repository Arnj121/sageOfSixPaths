let matrix=[]

document.getElementById('create').onclick = ()=>{
    document.getElementById('main').innerText=''
    matrix=[]
    document.getElementById('matrix-textarea').value = ''
    document.getElementById('matrix-window').style.display='none'
    document.getElementById('main').style.display='flex'
    document.getElementById('done').style.display='inline'
    let rows=  parseInt(document.getElementById('rows').value)
    let columns = parseInt(document.getElementById('columns').value)
    document.getElementById('main').style.width = ((15*columns)+(columns*2)).toString()+'px'
    document.getElementById('main').style.height= ((15*rows)+rows*2).toString()+'px'
    for(let i=0;i<rows;i++){
        let l=[]
        for(let j=0;j<columns;j++){
            let ele = document.createElement('div')
            ele.className = 'cells'
            ele.id=`cell-${i}-${j}`
            ele.innerText=rows*i+j
            ele.onclick =(e)=>{
                console.log(e.target.id)
                let id = e.target.id.split('-')
                if(matrix[parseInt(id[1])][parseInt(id[2])]==0){
                    document.getElementById(e.target.id).style.backgroundColor='white'
                    matrix[parseInt(id[1])][parseInt(id[2])]=3
                }else {
                    document.getElementById(e.target.id).style.backgroundColor = 'grey'
                    matrix[parseInt(id[1])][parseInt(id[2])] = 0
                }
                console.log(matrix)
            }
            document.getElementById('main').append(ele)
            l.push(3)
        }
        matrix.push(l)
    }
}
document.getElementById('done').onclick = ()=>{
    console.log(document.getElementById('root').children);
    document.getElementById('matrix-window').style.display='inline'
    document.getElementById('main').style.display='none'
    for(let i=0;i<matrix[0].length;i++){
        document.getElementById('matrix-textarea').value+='['+matrix[i]+'],'+'\n'

    }
}
