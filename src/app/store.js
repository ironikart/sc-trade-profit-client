import { createStore } from 'redux';
import reducer from './reducers/rootReducer.js';
import { getJSON } from './util/local_store';

// See data/ship_matrix_parsed.json
let matrix = [
    {
        "id": 22,
        "name": "M50 Interceptor",
        "cargocapacity": 0,
        "mass": 12000,
        "maxcrew": 1
    },
    {
        "id": 65,
        "name": "Mustang Alpha",
        "cargocapacity": 10,
        "mass": 13500,
        "maxcrew": 1
    },
    {
        "id": 66,
        "name": "Mustang Beta",
        "cargocapacity": 10,
        "mass": 17000,
        "maxcrew": 1
    },
    {
        "id": 67,
        "name": "Mustang Gamma",
        "cargocapacity": 10,
        "mass": 13000,
        "maxcrew": 1
    },
    {
        "id": 69,
        "name": "Mustang Delta",
        "cargocapacity": 10,
        "mass": 13000,
        "maxcrew": 1
    },
    {
        "id": 70,
        "name": "Mustang Omega",
        "cargocapacity": 10,
        "mass": 13000,
        "maxcrew": 1
    },
    {
        "id": 59,
        "name": "Redeemer",
        "cargocapacity": 24,
        "mass": 42000,
        "maxcrew": 5
    },
    {
        "id": 60,
        "name": "Gladius",
        "cargocapacity": 0,
        "mass": 16000,
        "maxcrew": 1
    },
    {
        "id": 1,
        "name": "Aurora ES",
        "cargocapacity": 13,
        "mass": 7550,
        "maxcrew": 1
    },
    {
        "id": 3,
        "name": "Aurora LX",
        "cargocapacity": 13,
        "mass": 7550,
        "maxcrew": 1
    },
    {
        "id": 4,
        "name": "Aurora MR",
        "cargocapacity": 13,
        "mass": 7550,
        "maxcrew": 1
    },
    {
        "id": 5,
        "name": "Aurora CL",
        "cargocapacity": 23,
        "mass": 7560,
        "maxcrew": 1
    },
    {
        "id": 6,
        "name": "Aurora LN",
        "cargocapacity": 13,
        "mass": 8300,
        "maxcrew": 1
    },
    {
        "id": 7,
        "name": "300i",
        "cargocapacity": 4,
        "mass": 20085,
        "maxcrew": 1
    },
    {
        "id": 8,
        "name": "315p",
        "cargocapacity": 6,
        "mass": 20085,
        "maxcrew": 1
    },
    {
        "id": 9,
        "name": "325a",
        "cargocapacity": 4,
        "mass": 20085,
        "maxcrew": 1
    },
    {
        "id": 10,
        "name": "350r",
        "cargocapacity": 0,
        "mass": 20085,
        "maxcrew": 1
    },
    {
        "id": 11,
        "name": "F7C Hornet",
        "cargocapacity": 13,
        "mass": 21948.88,
        "maxcrew": 1
    },
    {
        "id": 13,
        "name": "F7C-S Hornet Ghost",
        "cargocapacity": 0,
        "mass": 22370.56,
        "maxcrew": 1
    },
    {
        "id": 14,
        "name": "F7C-R Hornet Tracker",
        "cargocapacity": 0,
        "mass": 22370.56,
        "maxcrew": 1
    },
    {
        "id": 15,
        "name": "F7C-M Super Hornet",
        "cargocapacity": 0,
        "mass": 23218.81,
        "maxcrew": 2
    },
    {
        "id": 37,
        "name": "F7A Hornet",
        "cargocapacity": 0,
        "mass": 22932.81,
        "maxcrew": 1
    },
    {
        "id": 47,
        "name": "Constellation Aquila",
        "cargocapacity": 134,
        "mass": 80550,
        "maxcrew": 4
    },
    {
        "id": 45,
        "name": "Constellation Andromeda",
        "cargocapacity": 134,
        "mass": 80530,
        "maxcrew": 5
    },
    {
        "id": 46,
        "name": "Constellation Taurus",
        "cargocapacity": 243,
        "mass": 80000,
        "maxcrew": 4
    },
    {
        "id": 49,
        "name": "Constellation Phoenix",
        "cargocapacity": 66,
        "mass": 81000,
        "maxcrew": 4
    },
    {
        "id": 16,
        "name": "Freelancer",
        "cargocapacity": 52,
        "mass": 26000,
        "maxcrew": 2
    },
    {
        "id": 31,
        "name": "Freelancer DUR",
        "cargocapacity": 52,
        "mass": 28000,
        "maxcrew": 2
    },
    {
        "id": 32,
        "name": "Freelancer MAX",
        "cargocapacity": 123,
        "mass": 32000,
        "maxcrew": 2
    },
    {
        "id": 33,
        "name": "Freelancer MIS",
        "cargocapacity": 52,
        "mass": 30000,
        "maxcrew": 3
    },
    {
        "id": 56,
        "name": "Cutlass Black",
        "cargocapacity": 33,
        "mass": 33000,
        "maxcrew": 3
    },
    {
        "id": 57,
        "name": "Cutlass Red",
        "cargocapacity": 33,
        "mass": 36000,
        "maxcrew": 4
    },
    {
        "id": 58,
        "name": "Cutlass Blue",
        "cargocapacity": 33,
        "mass": 36000,
        "maxcrew": 3
    },
    {
        "id": 100,
        "name": "Avenger Stalker",
        "cargocapacity": 4,
        "mass": 18500,
        "maxcrew": 1
    },
    {
        "id": 101,
        "name": "Avenger Warlock",
        "cargocapacity": null,
        "mass": null,
        "maxcrew": null
    },
    {
        "id": 102,
        "name": "Avenger Titan",
        "cargocapacity": null,
        "mass": null,
        "maxcrew": null
    },
    {
        "id": 64,
        "name": "Gladiator",
        "cargocapacity": 0,
        "mass": 26000,
        "maxcrew": 2
    },
    {
        "id": 88,
        "name": "Starfarer",
        "cargocapacity": 3321,
        "mass": 350000,
        "maxcrew": 7
    },
    {
        "id": 89,
        "name": "Starfarer Gemini",
        "cargocapacity": 2488,
        "mass": 350000,
        "maxcrew": 7
    },
    {
        "id": 24,
        "name": "Caterpillar",
        "cargocapacity": 512,
        "mass": 84516.25,
        "maxcrew": 5
    },
    {
        "id": 72,
        "name": "Retaliator Bomber",
        "cargocapacity": 128,
        "mass": 188000,
        "maxcrew": 6
    },
    {
        "id": 99,
        "name": "Retaliator Base",
        "cargocapacity": 128,
        "mass": 188000,
        "maxcrew": 6
    },
    {
        "id": 26,
        "name": "Vanduul Scythe",
        "cargocapacity": 0,
        "mass": 29387.15,
        "maxcrew": 1
    },
    {
        "id": 27,
        "name": "Idris-M",
        "cargocapacity": 860,
        "mass": 1610110.13,
        "maxcrew": 10
    },
    {
        "id": 28,
        "name": "Idris-P",
        "cargocapacity": 1720,
        "mass": 1600110.13,
        "maxcrew": 10
    },
    {
        "id": 92,
        "name": "P-52 Merlin",
        "cargocapacity": 0,
        "mass": 6000,
        "maxcrew": 1
    },
    {
        "id": 104,
        "name": "P-72 Archimedes",
        "cargocapacity": 0,
        "mass": 6000,
        "maxcrew": 1
    },
    {
        "id": 35,
        "name": "Khartu-Al",
        "cargocapacity": 0,
        "mass": 15307.5,
        "maxcrew": 1
    },
    {
        "id": 36,
        "name": "Merchantman",
        "cargocapacity": 5018,
        "mass": 811395,
        "maxcrew": 8
    },
    {
        "id": 55,
        "name": "890 JUMP",
        "cargocapacity": 360,
        "mass": 202500,
        "maxcrew": 5
    },
    {
        "id": 62,
        "name": "Carrack",
        "cargocapacity": 1058,
        "mass": 180000,
        "maxcrew": 5
    },
    {
        "id": 61,
        "name": "Herald",
        "cargocapacity": 0,
        "mass": 18000,
        "maxcrew": 2
    },
    {
        "id": 41,
        "name": "Hull C",
        "cargocapacity": 4608,
        "mass": 298419,
        "maxcrew": 3
    },
    {
        "id": 84,
        "name": "Hull A",
        "cargocapacity": 48,
        "mass": 14303,
        "maxcrew": 1
    },
    {
        "id": 85,
        "name": "Hull B",
        "cargocapacity": 384,
        "mass": 67137,
        "maxcrew": 1
    },
    {
        "id": 86,
        "name": "Hull D",
        "cargocapacity": 20736,
        "mass": 1088057,
        "maxcrew": 5
    },
    {
        "id": 87,
        "name": "Hull E",
        "cargocapacity": 98304,
        "mass": 3241052,
        "maxcrew": 5
    },
    {
        "id": 71,
        "name": "Orion",
        "cargocapacity": 14040,
        "mass": 5400000,
        "maxcrew": 6
    },
    {
        "id": 51,
        "name": "Reclaimer",
        "cargocapacity": 6555,
        "mass": 600000,
        "maxcrew": 5
    },
    {
        "id": 63,
        "name": "Javelin-class Destroyer",
        "cargocapacity": 5400,
        "mass": null,
        "maxcrew": null
    },
    {
        "id": 75,
        "name": "Vanguard Warden",
        "cargocapacity": 0,
        "mass": 45000,
        "maxcrew": 2
    },
    {
        "id": 95,
        "name": "Vanguard Harbinger",
        "cargocapacity": null,
        "mass": 52000,
        "maxcrew": 2
    },
    {
        "id": 96,
        "name": "Vanguard Sentinel",
        "cargocapacity": null,
        "mass": 40000,
        "maxcrew": 2
    },
    {
        "id": 90,
        "name": "Reliant Kore - Mini Hauler",
        "cargocapacity": 30,
        "mass": 18750,
        "maxcrew": 2
    },
    {
        "id": 105,
        "name": "Reliant Mako - News Van",
        "cargocapacity": 13,
        "mass": 18750,
        "maxcrew": 2
    },
    {
        "id": 106,
        "name": "Reliant Sen - Researcher",
        "cargocapacity": 10,
        "mass": 18750,
        "maxcrew": 2
    },
    {
        "id": 107,
        "name": "Reliant Tana - Skirmisher",
        "cargocapacity": 10,
        "mass": 18750,
        "maxcrew": 2
    },
    {
        "id": 91,
        "name": "Genesis",
        "cargocapacity": 403,
        "mass": 275625,
        "maxcrew": 8
    },
    {
        "id": 93,
        "name": "Esperia Glaive",
        "cargocapacity": 0,
        "mass": 29387.15,
        "maxcrew": 1
    },
    {
        "id": 97,
        "name": "Endeavor",
        "cargocapacity": 500,
        "mass": 1000000,
        "maxcrew": 16
    },
    {
        "id": 98,
        "name": "Sabre",
        "cargocapacity": 0,
        "mass": 18000,
        "maxcrew": 1
    },
    {
        "id": 103,
        "name": "Anvil Crucible",
        "cargocapacity": 300,
        "mass": 525500,
        "maxcrew": 4
    },
    {
        "id": 108,
        "name": "Esperia Vanduul Blade",
        "cargocapacity": null,
        "mass": 10000,
        "maxcrew": 1
    },
    {
        "id": 109,
        "name": "Prospector",
        "cargocapacity": 128,
        "mass": 48956,
        "maxcrew": 1
    },
    {
        "id": 110,
        "name": "Buccaneer",
        "cargocapacity": 0,
        "mass": 14000,
        "maxcrew": 1
    },
    {
        "id": 111,
        "name": "Dragonfly Yellowjacket",
        "cargocapacity": 1,
        "mass": 1000,
        "maxcrew": 2
    },
    {
        "id": 112,
        "name": "Dragonfly Black",
        "cargocapacity": 1,
        "mass": 1000,
        "maxcrew": 2
    },
    {
        "id": 113,
        "name": "MPUV Personnel",
        "cargocapacity": 0,
        "mass": 6000,
        "maxcrew": 1
    },
    {
        "id": 114,
        "name": "MPUV Cargo",
        "cargocapacity": 2,
        "mass": 6000,
        "maxcrew": 1
    },
    {
        "id": 115,
        "name": "Anvil Terrapin",
        "cargocapacity": null,
        "mass": 30000,
        "maxcrew": 2
    }
];

let systems = ["Baker","Branaugh","Banshee","Bremen","Caliban","Cano","Castra","Cathcart","Centauri","Charon","Chronos","Corel","Croshaw","Davien","Eealus","Ellis","Elysium","Ferron","Fora","Garron","Geddon","Genesis","Gliese","Goss","Hades","Hadur","Hadrian","Helios","Idris","Kabal","Kallis","Kellog","Kiel","Kilian","Krell","Leir","Magnus","Min","Nemo","Nexus","Nul","Nyx","Oberon","Odin","Orion","Oretani","Osiris","Oso","Oretani","Oya","Pelles","Pyro","Rhetor","Rihlah","Sol","Stanton","Tal","Tamsa","Tanga","Taranis","Tayac","Terra","Tiber","Tohil","Trise","Tyrol","Vanguard","Vega","Vendetta","Virgil","Vulture","Yulin","Elysium"];

// Freelancer as default ship (id 16).
let defaultShip = 16;

let initialState = {
    'manifestReducer': {
        'currentShipId': defaultShip,
        'matrix':        matrix,
        'cargo':         [],
        'systems':       systems,
        'destination':   '',
        'origin':        ''
    },
    'expressionReducer': {
        'currentIndex': 0,
        'sets': [
            {
                'label':  'Profit (simple)',
                'output': 'total',
                'expr': [
                    'total=totalSell - totalBuy'
                ]
            },
            {
                'label':  'Profit (advanced)',
                'output': 'total',
                'expr': [
                    'base_profit=totalSell - totalBuy',
                    'time_per_jump=5',
                    'load_time_per_item=2',
                    'unload_time_per_item=2',
                    'time=(jumps * time_per_jump) + (load_time_per_item * totalQuantity) + (unload_time_per_item * totalQuantity)',
                    'time_value=time * 20',
                    'total=base_profit - time_value'
                ]
            }
        ]
    }
};

let expression = getJSON('expressions');
if (expression !== null) {
    initialState.expressionReducer = expression;
}

let manifest = getJSON('manifest');
if (manifest !== null) {
    initialState.manifestReducer = manifest;
}

let store = createStore(reducer, initialState);

export default store;