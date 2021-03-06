// JavaScript Document

function creditsButton(imgSource, imgSrcOnClick)
{
    // public member variables
	this.boxColor          = "rgb(200, 200, 200)";
	this.boxShadowColor    = "rgb(100, 100, 100)";
	this.x                 = 39;
	this.y                 = 31;
	this.width             = 200;
	this.height            = 60;
	this.text              = "Button Text";
	this.textColor         = "rgb(0, 0, 256)";
	this.src               = "none";
	this.img               = null;
	this.imgMainSrc        = null;
	this.imgClickSrc       = null;
	this.imgLoaded         = 0;
	if(imgSource){
		this.img = new Image();
		this.imgLoaded = 1;
		this.img.src = this.imgMainSrc = imgSource;
	}
};

// ----------------------------------------------------------------------------
// menuButton 'class' method: coordsAreInside
// ----------------------------------------------------------------------------
creditsButton.prototype.coordsAreInside = function(mouseX, mouseY)
{
    if (   ((mouseX > this.x) && (mouseX < (this.x + this.width))) 
		&& ((mouseY > this.y) && (mouseY < (this.y + this.height))) )
		return true;
	else
		return false;	
};

// ----------------------------------------------------------------------------
// menuButton class method: drawButton
// ----------------------------------------------------------------------------
creditsButton.prototype.drawButton = function(creditsContext)
{
	if (this.imgLoaded == 0)
	{
		creditsContext.font = "30px Verdana";   // could make this a button trait
		
		creditsContext.fillStyle = this.boxShadowColor;
		creditsContext.fillRect(this.x+2, this.y+2, this.width, this.height);
		creditsContext.fillStyle = this.boxColor;
		creditsContext.fillRect(this.x, this.y, this.width, this.height);
		creditsContext.fillStyle = this.textColor;
		creditsContext.fillText(this.text, this.x+5, this.y + this.height - 10);
	}
	else
	{    
		creditsContext.drawImage(this.img,
							  0, 0, this.img.width, this.img.height,
		                      this.x, this.y, this.width, this.height);
	}
};

function theCredits(backImage, buttonBack, buttonBackClick)
{
    //console.log("DEBUG: backImage sent = " + backImage);
    var creditsBckgrndLoaded = 0; // 0 means false, private var
    this.creditsBckgrndImg = new Image();
    this.creditsBckgrndImg.onload = function () { 	creditsBckgrndLoaded = 1; };
                                                //console.log("DEBUG: menu background loaded!" + menuBckgrndLoaded); };
    this.creditsBckgrndImg.src = backImage;
	
    var menuButton = new creditsButton(buttonBack);
    menuButton.text = "Play Game";
	
    // ----------------------------------------------------------------------------
    // Draw the Menu Screen
    // ----------------------------------------------------------------------------
    this.DrawCredits = function()
    {
        // Init Local Canvas variables
        var creditsCanvas = document.getElementById(CANVAS_CREDITS_ID);
        var creditsCtx = creditsCanvas.getContext("2d");
		
		creditsCtx.drawImage(this.creditsBckgrndImg, 0, 0);
		menuButton.drawButton(creditsCtx);
		
	};
	
	this.doMouseOver = function(evt)
	{
		var creditsCanvas = document.getElementById(CANVAS_CREDITS_ID);
		var mousePos = Game.getMousePos(creditsCanvas, evt);
		
		if ( menuButton.coordsAreInside(mousePos.x, mousePos.y) )
		{
			menuButton.img.src = buttonBackClick;
		}
		else {
			menuButton.img.src = buttonBack;
		}
	};
	
	this.doMenuClick = function(evt)
	{
		var menuCanvas = document.getElementById(CANVAS_MENU_ID);
		var creditsCanvas = document.getElementById(CANVAS_CREDITS_ID);
	
		var mousePos = Game.getMousePos(creditsCanvas, evt);

		if ( menuButton.coordsAreInside(mousePos.x, mousePos.y) )
		{
			creditsCanvas.style.display = "none";
			menuCanvas.style.display    = "block";
			Game.gameState = Game.STATE_MENU;
		} 
	};
    
};