var data = { //saved between sessions
    mecha1 : new Mecha("Tank", 2000, 50),

    flag: Array(100).fill(false),
}

var global = { //NOT saved between sessions
    kaiju1 : new Kaiju("Small Kaiju", 5000),
}

function Mecha(_name, _health, _energy)
{
    this.name = _name;
    this.health = _health;
    this.healthMax = _health;
    this.energy = _energy;
    this.energyMax = _energy;
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

function Kaiju(_name, _health)
{
    this.name = _name;
    this.health = _health;
    this.healthMax = _health;
    this.weapon0 = new Weapon("Kaiju Punch", 500, "Melee", 2, 0, 0);
}

window.onload = function() 
{
    if (data.flag[0] == false) // new game
    {
        this.UpdateMakeVisible("mecha1block");
        Update("mecha1name", data.mecha1.name);

        Update("mecha1healthtext", data.mecha1.health);
        Update("mecha1healthmaxtext", data.mecha1.healthMax);
        UpdatePercentWidth("mecha1health", data.mecha1.health, data.mecha1.healthMax);

        Update("mecha1energytext", data.mecha1.energy);
        Update("mecha1energymaxtext", data.mecha1.energy);
        UpdatePercentWidth("mecha1energy", data.mecha1.energy, data.mecha1.energyMax);

        this.UpdateMakeVisible("kaiju1block");
        Update("kaiju1name", global.kaiju1.name);

        Update("kaiju1healthtext", global.kaiju1.health);
        Update("kaiju1healthmaxtext", global.kaiju1.healthMax);
        UpdatePercentWidth("kaiju1health", global.kaiju1.health, global.kaiju1.healthMax);
    }
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
    document.getElementById(_id).classList.remove("d-none");
}
