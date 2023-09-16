class SageOfsixPaths{
    matrix=[[]]
    paths=[]
    vis=[]
    target=0
    init=0
    pathCost={}
    maxcostpath={value:0,path:[]}
    mincostpath={value:9999,path:[]}
    constructor(matrix=[[]]){
        this.matrix=matrix
        this.resetvisitor()
    }
    resetvisitor(){
        this.vis=[]
        for(let i=0;i<this.matrix[0].length;i++){
            this.vis.push(0)
        }
    }
    canreach(p,vis) {
        let l = this.matrix[p]
        let a = []
        for (let i = 0; i < l.length; i++) {
            if (l[i] >0 && vis[i]!=1)
                a.push(i)
        }
        return [a,p]
    }
    getPaths(init,dest) {
        this.init=init
        this.paths=[];
        this.resetvisitor()
        console.log(this.vis)
        this.findPath(this.canreach(dest, this.vis), [], this.vis)
        let max=0,min=999,maxind,minind
        for(let i=0;i<this.paths.length;i++) {
            if (this.paths[i].length > max) {
                max = this.paths[i].length
                maxind=i
            }
            if (this.paths[i].length < min) {
                min = this.paths[i].length
                minind=i
            }
        }
        this.maxcostpath.path=this.paths[maxind]
        this.mincostpath.path=this.paths[minind]
        for(let i=0;i<this.paths.length;i++){this.paths[i]=this.paths[i].reverse()}
        return this.paths
    }
    findPath(s,path,vis) {
        if (s[0].length) {
            path.push(s[1])
            vis[s[1]]=1
            console.log('ways to reach ',s[1],s[0])
            for(let i=0;i<s[0].length;i++){
                console.log('navigating ', s[0][i] ,'from', s[1],'with',path)
                if(s[0][i] == this.init){
                    let q = [...path];q.push(s[0][i])
                    this.paths.push(q)
                    console.log('found paths is',path)
                }else{
                    this.findPath(this.canreach(s[0][i],[...vis]),[...path],[...vis])
                }
            }
        }
    }
    getCost(init,dest) {
        this.pathCost={}
        this.paths=[]
        if(this.paths.length==0){
            this.getPaths(init,dest)
        }
        for(let i=0;i<this.paths.length;i++){
            let p = this.paths[i]
            let cost=0
            for(let j=0;j<p.length-1;j++){
                cost+=this.matrix[p[j+1]][p[j]]
            }
            if(this.maxcostpath.value<cost){
                this.maxcostpath.value=cost
                this.maxcostpath.path=p
            }
            if(this.mincostpath.value>cost){
                this.mincostpath.value=cost
                this.mincostpath.path=p
            }
            this.pathCost[p] = cost
        }
        return this.pathCost
    }
}
class SageOfsixPathsElimination{
    matrix=[[]]
    paths=[]
    vis=[]
    target=0
    init=0
    st=0
    en=0
    pathCost={}
    supermatrix=[[]]
    maxcostpath={value:0,path:[]}
    mincostpath={value:9999,path:[]}
    constructor(matrix=[[]]){
        this.matrix=matrix
        this.resetvisitor()
    }
    resetvisitor(){
        this.vis=[]
        for(let i=0;i<this.matrix[0].length;i++){
            this.vis.push(0)
        }
    }
    canreach(p,vis) {
        let l = this.matrix[p]
        let a = []
        for (let i = this.st; i <= this.en; i++) {
            if (l[i] >0 && vis[i]!=1)
                a.push(i)
        }
        return [a,p]
    }
    getPaths(init,dest) {
        this.init=init
        this.paths=[];
        if(Math.abs(init-dest)<=10){
            this.st=init
            this.en=dest
            if(init>dest){
                this.st=dest
                this.en=init
            }
        }
        else{
            this.st=0
            this.en=this.matrix[0].length-1
        }
        this.resetvisitor()
        this.findPath(this.canreach(dest, this.vis), [], this.vis)
        this.matrix = this.supermatrix
        let max=0,min=99999,maxind,minind
        for(let i=0;i<this.paths.length;i++) {
            if (this.paths[i].length > max) {
                max = this.paths[i].length
                maxind=i
            }
            if (this.paths[i].length < min) {
                min = this.paths[i].length
                minind=i
            }
        }
        this.maxcostpath.path=this.paths[maxind]
        this.mincostpath.path=this.paths[minind]
        for(let i=0;i<this.paths.length;i++){this.paths[i]=this.paths[i].reverse()}
        return this.paths
    }
    findPath(s,path,vis) {
        if (s[0].length) {
            path.push(s[1])
            vis[s[1]]=1
            //console.log('ways to reach ',s[1],s[0])
            for(let i=0;i<s[0].length;i++){
                //console.log('navigating ', s[0][i] ,'from', s[1],'with',path)
                if(s[0][i] == this.init){
                    let q = [...path];q.push(s[0][i])
                    this.paths.push(q)
                    //console.log('found paths is',q)
                }else{
                    this.findPath(this.canreach(s[0][i],[...vis]),[...path],[...vis])
                }
            }
        }
    }
    getCost(init,dest) {
        this.pathCost={}
        this.paths=[]
        if(this.paths.length==0){
            this.getPaths(init,dest)
        }
        for(let i=0;i<this.paths.length;i++){
            let p = this.paths[i]
            let cost=0
            for(let j=0;j<p.length-1;j++){
                cost+=this.matrix[p[j+1]][p[j]]
            }
            if(this.maxcostpath.value<cost){
                this.maxcostpath.value=cost
                this.maxcostpath.path=p
            }
            if(this.mincostpath.value>cost){
                this.mincostpath.value=cost
                this.mincostpath.path=p
            }
            this.pathCost[p] = cost
        }
        return this.pathCost
    }
    isConnected(){
        for(let i=0;i<this.matrix[0].length;i++){
            let flag=0
            for(let j=0;j<this.matrix[0].length;j++){
                if(this.matrix[i][j] >0)
                    flag=1
            }
            if(flag)
                flag=0
            else
                return false
        }
        return true
    }
    createMatrix(matrix=[]){
        if(matrix.length==0){
            let m = []
            for(let i=0;i<this.matrix[0].length**2;i++){
                let s=[]
                for(let j=0;j<this.matrix[0].length**2;j++) {
                    s.push(0)
                }
                m.push(s)
            }
            for(let i=0;i<this.matrix[0].length;i++){
                for(let j=0;j<this.matrix[0].length;j++){
                    if(this.matrix[i][j] ==1 || this.matrix[i][j] ==2 || this.matrix[i][j] == 3){
                        let v = this.path(i,j,this.matrix)
                        if(v[0]) {
                            console.log(this.matrix[0].length*i+j,this.matrix[0].length*(i-1)+j,i,j)
                            m[this.matrix[0].length*i+j][this.matrix[0].length*(i-1)+j] = 1
                            m[this.matrix[0].length*(i-1)+j][this.matrix[0].length*i+j] = 1
                        }
                        if(v[1]){
                            console.log(this.matrix[0].length*i+j,this.matrix[0].length*i+j+1,i,j)
                            m[this.matrix[0].length*i+j][this.matrix[0].length*i+j+1]=1
                            m[this.matrix[0].length*i+j+1][this.matrix[0].length*i+j]=1
                        }
                        if(v[2]) {
                            console.log((this.matrix[0].length*(i+1)+j),(this.matrix[0].length*i)+j,i,j)
                            m[this.matrix[0].length*(i+1)+j][this.matrix[0].length*i+j]=1
                            m[this.matrix[0].length*i+j][this.matrix[0].length*(i+1)+j]=1
                        }
                        if(v[3]){
                            console.log(this.matrix[0].length*i+j,this.matrix[0].length*i+j-1,i,j)
                            m[this.matrix[0].length*i+j][this.matrix[0].length*i+j-1]=1
                            m[this.matrix[0].length*i+j-1][this.matrix[0].length*i+j]=1
                        }
                    }
                }
            }
            this.matrix=m
        }
        else{
            let m = []
            for(let i=0;i<matrix[0].length**2;i++){
                let s=[]
                for(let j=0;j<matrix[0].length**2;j++) {
                    s.push(0)
                }
                m.push(s)
            }
            for(let i=0;i<matrix[0].length;i++){
                for(let j=0;j<matrix[0].length;j++){
                    if(matrix[i][j] ==1 || matrix[i][j] ==2 || matrix[i][j] == 3){
                        let v = this.path(i,j,matrix)
                        if(v[0]) {
                            console.log(matrix[0].length*i+j,matrix[0].length*(i-1)+j,i,j)
                            m[matrix[0].length*i+j][matrix[0].length*(i-1)+j] = 1
                            m[matrix[0].length*(i-1)+j][matrix[0].length*i+j] = 1
                        }
                        if(v[1]){
                            console.log(matrix[0].length*i+j,matrix[0].length*i+j+1,i,j)
                            m[matrix[0].length*i+j][matrix[0].length*i+j+1]=1
                            m[matrix[0].length*i+j+1][matrix[0].length*i+j]=1
                        }
                        if(v[2]) {
                            console.log((matrix[0].length*(i+1)+j),(matrix[0].length*i)+j,i,j)
                            m[matrix[0].length*(i+1)+j][matrix[0].length*i+j]=1
                            m[matrix[0].length*i+j][matrix[0].length*(i+1)+j]=1
                        }
                        if(v[3]){
                            console.log(matrix[0].length*i+j,matrix[0].length*i+j-1,i,j)
                            m[matrix[0].length*i+j][matrix[0].length*i+j-1]=1
                            m[matrix[0].length*i+j-1][matrix[0].length*i+j]=1
                        }
                    }
                }
            }
            return m
        }
    }
    path(i,j,vis){
        let v=[false,false,false,false]
        try {
            if (vis[i - 1][j] && vis[i - 1][j] != 0) {
                v[0] = true
                console.log(vis[i - 1][j], 'top', i, j)
            }
        }catch (e) {}
        try {
            if (vis[i][j + 1] && vis[i][j + 1] != 0) {
                v[1] = true
                console.log(vis[i][j + 1], 'rigt', i, j)
            }
        }catch (e) {}
        try {
            if (vis[i + 1][j] && vis[i + 1][j] != 0) {
                v[2] = true
                console.log(vis[i + 1][j], 'donw', i, j)
            }
        }catch (e) {}
        try {
            if (vis[i][j - 1] && vis[i][j - 1] != 0) {
                v[3] = true
                console.log(vis[i][j - 1], 'left', i, j)
            }
        }catch (e) {}
        return v
    }
}
var matrix=[
    [0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [200, 0, 50, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 50, 0, 150, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 100, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 200, 0, 0, 0],
    [0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 200, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 100, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 300, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 0, 200],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0]]


var sosp = new SageOfsixPaths(matrix)
document.getElementById('find').onclick = ()=>{
    let source = parseInt(document.getElementById('source').value)
    let dest = parseInt(document.getElementById('dest').value)
    if(isNaN(source) && isNaN(dest)){
        document.getElementById('error').style.display = 'inline'
    }
    else{
        let ele = document.getElementById('network').children
        for(let i=0;i<ele.length;i++){
            ele[i].style.backgroundColor ='white'
        }
        document.getElementById('error').style.display='none'
        sosp.getCost(source,dest)
        let p = sosp.mincostpath
        console.log(p)
        let path = p.path
        for(let i=0;i<path.length-1;i++){
            if((matrix[path[i]][path[i+1]] == matrix[path[i]][path[i+1]]) && matrix[path[i]][path[i+1]]>0){
                let q = `path-${path[i]}-${path[i+1]}-${path[i+1]}-${path[i]}`;console.log(q)
                try {
                    document.getElementById(q).style.backgroundColor = '#4e68ee'
                }catch (e) {
                    q = `path-${path[i+1]}-${path[i]}-${path[i]}-${path[i+1]}`;console.log(q)
                    document.getElementById(q).style.backgroundColor = '#4e68ee'
                }
            }
            else{
                let q= `path-${path[i]}-${path[i+1]}`;console.log(q)
                document.getElementById(q).style.backgroundColor='#4e68ee'
            }
        }
    }
}
