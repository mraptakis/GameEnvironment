export default {
    "meta": {
        "renderer": "three.js",
    },
    "objects": [
        {
            "meta":{
                "name": "BOOOOOX",
                "texture": "./assets/textures/wood.jpeg"
            },
            "category": "Box",
            "position": {"x":900,"y":500}
        },
        {
            "meta":{
                "name": "SPHE"
            },
            "category": "Sphere",
            "color" : "#ffff00",
            "position": {"x":900,"y":350}
        },
        {
            "meta":{
                "name": "SPHEEERE"
            },
            "category": "Sphere",
            "color" : "#00ffff",
            "position": {"x":750,"y":500}
        },
        {
            "meta":{
                "name": "PLAAANE",
                "texture": "./assets/textures/blueprint.jpg",
                "dim":{
                    "width": 15,
                    "height": 10
                },
                "rotation":{"x":-1}
            },
            "category": "Plane",
            "color" : "#0080ff",
            "position": {"x":750,"y":500}
        },
        {
            "meta":{
                "name": "SPHEEERE3"
            },
            "category": "Sphere",
            "color" : "#00ff00",
            "position": {"x":1050,"y":500}
        },
        {
            "meta":{
                "name": "TEEEEXT",
                defaultText: "this is a text"
            },
            "category": "Text",
            "color" : "#00ff00",
            "position": {"x":1000,"y":100}
        }
    ]
}