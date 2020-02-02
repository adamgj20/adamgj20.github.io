var config = {
    type: Phaser.AUTO,
    width: '100%',
    height: 500,
    scene: {
        create: create
    },
};

var objects = [];

var groups = [['lightly over a', 'on a warm spring day', 'carpet of flowers', 'A butterfly floats'],
['fingers in front', 'of me, laughing happily', 'closely, my baby', 'I follow it'],
['I run until', 'under the shadow of centennial trees', 'a rolling hill,', 'I get over'],
['her, my baby smile. Forever.', 'has gone', 'The netya butterfly', 'and, with'],
["We already have all", "All we have to do", "the facts and solutions.", "is to wake up and change."],
];

var solutions = [
	'A butterfly floats lightly over a carpet of flowers on a warm spring day',
	'I follow it closely, my baby fingers in front of me, laughing happily',
	'I run until I get over a rolling hill, under the shadow of centennial trees',
	'The netya butterfly has gone and, with her, my baby smile. Forever.',
	"We already have all the facts and solutions. All we have to do is to wake up and change.",
];

var level = 0;

var game = new Phaser.Game(config);



function create ()
{
    var group = this.add.group();

    group.classType = Phaser.GameObjects.Text;

    var chunks = groups[level];


    for (var i=0; i<chunks.length; i++) {
        var x = Phaser.Math.Between(0, 400);
        var y = Phaser.Math.Between(0, 400);
        var str = chunks[i];
        var font = { font: '28px Arial' };
        var text = group.create(x, y, str, font);
   

        text.setInteractive(new Phaser.Geom.Rectangle(0, 0, text.width, text.height), Phaser.Geom.Rectangle.Contains);

        this.input.setDraggable(text);
        objects.push(text);
     }

    this.input.on('gameobjectover', function (pointer, gameObject) {

        gameObject.setTint(0xff0000, 0xff0000, 0xffff00, 0xff00ff);

    });

    this.input.on('gameobjectout', function (pointer, gameObject) {

        gameObject.clearTint();

    });

     this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });
	
	function nextLevel() {
	
		level++;
		
		if (level >= groups.length) {
			alert("You win.");
			window.location.reload();
		}
		
		var chunks = groups[level];
		
		for (var i=0; i<objects.length; i++) {
			var o = objects[i];
			o.setText(chunks[i]);
		}
		
	};

    this.input.on('dragend', function (pointer, gameObject, dragX, dragY) {

        
        var texts = [];
		var used = [];
		
		console.log(objects);
		
		while (texts.length < objects.length) {
        
			var lowestX = null;
			var lowestObj = null;
			
			// Find left-most object that hasn't already been found.
			for (var i=0; i<objects.length; i++) {
				
				if (used.indexOf(i) >= 0)
					continue;
				
				if (lowestX === null || objects[i].x <= lowestX) {
					lowestX = objects[i].x;
					lowestObj = i;
				}
			}
			used.push(lowestObj);
			texts.push(objects[lowestObj]._text);
		}
		
		var attempt = texts.join(' ');
		
		if (solutions.indexOf(attempt) >= 0) {
			alert(attempt + '\n\n' + "You may eat a reward.");
			nextLevel();
		}

    });
}
