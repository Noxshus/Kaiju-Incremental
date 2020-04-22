function CombatLoop()
{
    let _unitInTurn = ReturnFastest();

    Attack(_unitInTurn.unitType, _unitInTurn.unitElement);
}

function ReturnFastest() //finds the mecha or kaiju with the highest accumulated speed value. Returns an object with either team + the element of the fastest contender
{
    let _fastestMecha = 0;
    let _fastestKaiju = 0;

    for (let i = 0; i < data.mecha.length; i++)
    {
        data.mecha[i].speedAccumulated += data.mecha[i].speed;
        if (data.mecha[_fastestMecha].speedAccumulated > data.mecha[i].speedAccumulated)
        {
            _fastestMecha = i;
        }
    }

    for (let i = 0; i < data.kaiju.length; i++)
    {
        data.kaiju[i].speedAccumulated += data.kaiju[i].speed;
        if (data.kaiju[_fastestKaiju].speedAccumulated > data.kaiju[i].speedAccumulated)
        {
            _fastestKaiju = i;
        }
    }

    if (data.mecha[_fastestMecha].speedAccumulated > data.kaiju[_fastestKaiju].speedAccumulated)
    {
        data.mecha[_fastestMecha].speedAccumulated = 0; //reset the value as we're giving them the turn
        return {unitType: "mecha", unitElement: _fastestMecha};
    }
    else
    {
        data.kaiju[_fastestKaiju].speedAccumulated = 0; //reset the value as we're giving them the turn
        return {unitType: "kaiju", unitElement: _fastestKaiju};
    }
}

function ReturnTarget(_unitType) //returns a random target for the given unit type
{
    if (_unitType == "mecha")
    {
        return {unitType: "kaiju", unitElement: ReturnRandomInteger(0, (data.kaiju.length - 1))}; //-1 because .length doesn't account for 0 element
    }
    else if (_unitType == "kaiju")
    {
        return {unitType: "mecha", unitElement: ReturnRandomInteger(0, (data.mecha.length - 1))}; //-1 because .length doesn't account for 0 element
    }
}

function Attack(_unitType, _unitElement)
{
    let _target = ReturnTarget(_unitType);

    data[_target.unitType][_target.unitElement].health -= data[_unitType][_unitElement].weapon0.damage;

    UpdateAllHealthValues()
}


function EndOfCombat() //run this at the end of combat to reset any values
{
    data.combatTurn = 0;

    for (let i = 0; i < data.mecha.length; i++)
    {
        data.mecha[i].speedAccumulated = 0;
    }

    for (let i = 0; i < data.kaiju.length; i++)
    {
        data.kaiju[i].speedAccumulated = 0;
    }
}

