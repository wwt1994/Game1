/*
* @Author: Administrator
* @Date:   2017-05-10 17:59:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-12 08:49:57
*/

'use strict';


/*生命
restart重新开始：停止、元素删除、数据、生命、分数、start
关卡
下一关：时间
重复字符
重复位置
文字可换成图片
*/

window.onload=function(){

	let begin=document.querySelector('.begin');
	let storm=document.querySelector('.storm');
	let box=document.querySelector('.box');
	begin.onclick=function(){
		begin.style.display='none';
		storm.style.display='block';
		box.style.display='block';
		let game=new Game();
		game.start();
	}
	


	function Game(){
		//属性：往下掉的属性
		this.charArr=[
		['A','img/A.jpg'],
		['B','img/B.jpg'],
		['C','img/C.jpg'],
		['D','img/D.jpg'],
		['E','img/E.jpg'],
		['F','img/F.jpg'],
		['G','img/G.jpg'],
		['H','img/H.jpg'],
		['I','img/I.jpg'],
		['J','img/J.jpg'],
		['K','img/K.jpg'],
		['L','img/L.jpg'],
		['M','img/M.jpg'],
		['N','img/N.jpg'],
		['O','img/O.jpg'],
		['P','img/P.jpg'],
		['Q','img/Q.jpg'],
		['R','img/R.jpg'],
		['S','img/S.jpg'],
		['T','img/T.jpg'],
		['U','img/U.jpg'],
		['V','img/V.jpg'],
		['W','img/W.jpg'],
		['X','img/X.jpg'],
		['Y','img/Y.jpg'],
		['Z','img/Z.jpg']
		];
		//要掉的个数
		this.charLength=5;
		this.speed=10;
		this.arr=[];
		this.pos=[];
		this.sm=10;
		this.score=0;
		this.smElement=document.querySelector('.sm');
		this.scoreElement=document.querySelector('.score');	
		this.smElement.innerText=this.sm;
		this.scoreElement.innerText=this.score;
		this.gq=10;
		this.passl=1;
		this.pass=document.querySelector('.pass');
		this.pass.innerText=this.passl;
	}
	Game.prototype={
		start:function(){
			//得到数
			this.getElement(this.charLength);
			this.drop();
			this.key();
		},	
		getElement:function(length){
			for(let i=0;i<length;i++){
				//得到元素
				this.getChar();
			}
		},
		getChar:function(){
			//随机获取下标 this.charArr[num]
			let num=Math.floor(Math.random()*this.charArr.length);
			//去重
			while(this.checkRe(this.charArr[num][0])){
				num=Math.floor(Math.random()*this.charArr.length);
			}
			//创建一个盒子放元素
			let divs=$('<div>');
			//设置盒子的样子
			divs.style.cssText=`width:70px;height:70px;background-image:url(${this.charArr[num][1]});background-size:cover;background-position:center;text-align: center;line-height: 50px;font-size:0px;font-weight:800;position: absolute;`;
			//获取浏览器宽高
			let cw=window.innerWidth;
			let ch=window.innerHeight;

			//设置定位的高在1-100；左右的空200px
			let lefts,tops;

			//判断位置不重复
			do{
				tops=Math.random()*200;
				lefts=Math.random()*(cw-200)+100;
			}while(
				this.checkPos(lefts,tops)
				)
			
			this.pos.push({lefts,tops});
			divs.style.top=tops+'px';
			divs.style.left=lefts+'px';
			//将内容放入盒子中
			divs.innerText=this.charArr[num][0];
			//插入到页面中
			document.body.appendChild(divs);

			//将盒子放入到arr中，供往下掉时用
			this.arr.push(divs);

		},
		checkRe:function(text){
			return this.charArr.some(function(value,index){
				return value.innerText==text;
			})
		},
		checkPos:function(l,t){
			return this.pos.some(function(value,index){
				return l+70>value.lefts&&l<value.lefts+70&&t+70>value.tops&&t<value.tops+70
			})
		},
		drop:function(){
			let self=this;
			//之后还会用到事件属性，所欲将t保存成一个属性
			self.t=setInterval(function(){
					
				self.arr.forEach(function(value,index){
					
					value.style.top=value.offsetTop+self.speed+'px';

					if(value.offsetTop>500){
						document.body.removeChild(value);
						self.arr.splice(index,1);
						self.sm--;
						self.smElement.innerText=self.sm;

						//判断；重新开始
						if(self.sm<0){
							let flag=window.confirm('游戏失败，是否继续')
							if(flag){
								// 重新开始
								self.restart();
							}else{
								//关闭页面
								close();
							}
						}				
					}	
					
				})

				if(self.arr.length<self.charLength){
					self.getChar();
				}
	
			},200);
			
		},
		key:function(){

			document.body.onkeydown=function(e){
				
				let key_code=String.fromCharCode(e.keyCode);

				for(let i=0;i<this.arr.length;i++){
					if(key_code==this.arr[i].innerText){
						document.body.removeChild(this.arr[i]);
						this.arr.splice(i,1);
						this.score++;
						this.scoreElement.innerText=this.score;
						if(this.score==this.gq){
							this.passl++;
							this.pass.innerText=this.passl;
							this.next();
						}
					}
				}
				if(this.arr.length<this.charLength){
					this.getChar();
				}
				


			}.bind(this);


		},
		restart:function(){
			//停止字符掉
			clearInterval(this.t);
			//字符清除
			for(let i=0;i<this.arr.length;i++){
				document.body.removeChild(this.arr[i]);
			}
			this.arr=[];
			this.pos=[];
			this.charLength=5;
			this.sm=10;
			this.score=0;
			this.smElement.innerText=this.sm;
			this.scoreElement.innerText=this.score;
			this.passl=1;
			this.pass.innerText=this.passl;
			this.start();
		},
		next:function(){
			clearInterval(this.t);
			for(let i=0;i<this.arr.length;i++){
				document.body.removeChild(this.arr[i]);
			}
			if(this.charLength<10){
				this.charLength++;
			}
			this.arr=[];
			this.pos=[];
			this.gq+=10;
			this.start();

		},



	}


	


	
}



