//每个导航对象
class NavigationBarObj{
    constructor(nameBar,icon,bgColor,isActive,linkTo,subscribleName){
        this.nameBar = nameBar;
        this.bgColor = bgColor;
        this.linkTo = linkTo;
        this.isActive = isActive;
        this.icon = icon;
        this.subscribleName = subscribleName;
    }
    onActive(){
        if(this.isActive){
            return;
        }
        this.isActive = true;
    }
    offActive(){
        if(!this.isActive){
            return;
        }
        this.isActive = false;
    }
}

export default NavigationBarObj;