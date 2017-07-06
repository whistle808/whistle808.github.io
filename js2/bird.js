/**
 * Created by Administrator on 2017/7/2.
 */
function Bird(option){
    this.ctx = option.ctx;
    this.birdImg = option.birdImg;
    this.canvasX = option.canvasX;
    this.canvasY = option.canvasY;


    this.birdW = option.birdImg.width / 3;
    this.birdH = option.birdImg.height;
    this.g = 0.0003;
    this.birdSpeed = 0;
    this.maxAngle = 45;
    this.maxSpeed = 0.45;
    this.birdIndex = 0;
    this.birdX = 0;
}

Bird.prototype = {
    constructor:Bird,
    drawBird:function(offsetT){
        this.ctx.save();
        /*重力加速度公式
         * 移动距离 =  速度 * 时间 + g *时间间隔 * 时间间隔  / 2
         * 速度 = 初速度 + g * 时间间隔*/
        var distanceY = this.birdSpeed * offsetT + this.g * offsetT *offsetT / 2;
        this.birdSpeed = this.birdSpeed + this.g * offsetT;
        this.canvasY += distanceY;
        /*计算小鸟过程中头部需要旋转的角度值 */
        var currentAngle = this.maxAngle * this.birdSpeed / this.maxSpeed;
        if(currentAngle > 45){
            currentAngle = 45;
        }

        /*水平坐标需要每次重新计算获取*/
        this.birdX = this.birdIndex * this.birdW;



        /*实现偏移*/
        this.ctx.translate(this.canvasX + this.birdW / 2,this.canvasY + this.birdH / 2);
        /*实现旋转*/
        this.ctx.rotate(Math.PI / 180 * currentAngle);
        //ctx.drawImage(图片,素材x,素材y,素材w,素材h,画布x,画布y,素材w,素材h)
        this.ctx.drawImage(this.birdImg,this.birdX,0,this.birdW,this.birdH,- this.birdW / 2,- this.birdH / 2,this.birdW,this.birdH);


        this.birdIndex ++;
        /*索引判断*/
        if(this.birdIndex > 2){
            this.birdIndex = 0;
        }
        this.ctx.restore();
    }
}