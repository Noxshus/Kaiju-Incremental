var data = { //saved between sessions
    mecha: [],
    kaiju: [],

    combatTurn: 0, //turn counter, reset at the end of combat

    flag: Array(100).fill(false),
}

var global = { //NOT saved between sessions

}

function Mecha(_name, _health, _energy, _speed)
{
    this.name = _name;
    this.health = _health;
    this.healthMax = _health;
    this.energy = _energy;
    this.energyMax = _energy;
    this.speed = _speed;
    this.speedAccumulated = 0; //for each turn that a unit doesn't act, their speed value is added to this, until it's the highest value
    this.weapon0 = new Weapon("Tank Gun", 1000, "Projectile", 60, 1, 10);
}

function Weapon(_name, _damage, _type, _rateOfFire, _magazine, _reloadTime)
{
    this.name = _name;
    this.damage = _damage;
    this.type = _type;
    this.rateOfFire = _rateOfFire; //per minute
    this.magazine = _magazine;
    this.magazineCurrent = _magazine;
    this.reloadTime = _reloadTime; //in seconds
}

function Kaiju(_name, _health, _speed)
{
    this.name = _name;
    this.health = _health;
    this.healthMax = _health;
    this.speed = _speed;
    this.speedAccumulated = 0;
    this.weapon0 = new Weapon("Kaiju Punch", 500, "Melee", 2, 0, 0);
}

window.onload = function() 
{
    AddMecha("Main Battle Tank", 2000, 50, 50);
    AddKaiju("Small Kaiju", 5000, 25);

    if (data.flag[0] == false) // new game
    {
        this.UpdateMakeVisible("mecha0block");
        Update("mecha0name", data.mecha[0].name);

        Update("mecha0healthtext", data.mecha[0].health);
        Update("mecha0healthmaxtext", data.mecha[0].healthMax);
        UpdatePercentWidth("mecha0health", data.mecha[0].health, data.mecha[0].healthMax);

        Update("mecha0energytext", data.mecha[0].energy);
        Update("mecha0energymaxtext", data.mecha[0].energy);
        UpdatePercentWidth("mecha0energy", data.mecha[0].energy, data.mecha[0].energyMax);

        this.UpdateMakeVisible("kaiju0block");
        Update("kaiju0name", data.kaiju[0].name);

        Update("kaiju0healthtext", data.kaiju[0].health);
        Update("kaiju0healthmaxtext", data.kaiju[0].healthMax);
        UpdatePercentWidth("kaiju0health", data.kaiju[0].health, data.kaiju[0].healthMax);
    }

    setInterval(CombatLoop, 1000);
}



function AddMecha(_name, _health, _energy, _speed) //adds a Mecha into the mecha array
{
    let _mecha = new Mecha(_name, _health, _energy, _speed);
    data.mecha.push(_mecha);
}

function AddKaiju(_name, _health, _speed) //as above, but for Kaiju
{
    let _kaiju = new Kaiju(_name, _health, _speed);
    data.kaiju.push(_kaiju);
}

//Helper Functions

function Update(_id, _content) 
{
    document.getElementById(_id).innerHTML = _content;
}

function UpdatePercentWidth(_id, _numerator, _denominator) //used by progress bars mainly / assuming we're using base 100 for the %
{
    let _percent = (_numerator / _denominator) * 100;
    document.getElementById(_id).style.width = _percent + "%";
}

function UpdateMakeVisible(_id)
{
    document.getElementById(_id).classList.remove("invisible");
}

function UpdateAllHealthValues()
{
    for (let i = 0; i < data.mecha.length; i++)
    {
        Update("mecha" + i + "healthtext", data.mecha[i].health);
        Update("mecha" + i + "healthmaxtext", data.mecha[i].healthMax);
        UpdatePercentWidth("mecha" + i + "health", data.mecha[i].health, data.mecha[i].healthMax);        
    }
    
    for (let i = 0; i < data.kaiju.length; i++)
    {   
        Update("kaiju" + i + "healthtext", data.kaiju[i].health);
        Update("kaiju" + i + "healthmaxtext", data.kaiju[i].healthMax);
        UpdatePercentWidth("kaiju" + i + "health", data.kaiju[i].health, data.kaiju[i].healthMax);
    }
}

function ReturnRandomInteger(min, max) //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
