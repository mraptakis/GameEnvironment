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
            "position": {"x":90,"y":90}
        },
        {
            "meta":{
                "name": "SPHEEERE"
            },
            "category": "Sphere",
            "color" : "#00ffff",
            "position": {"x":90,"y":10}
        },
        {
            "meta":{
                "name": "HUUUMAN"
            },
            "category": "Humanoid",
            "color" : "#00ff00",
            "position": {"x":80,"y":10}
        },
        {
            "meta":{
                "name": "PLAAANE",
                "texture": "./assets/textures/blueprint.jpg",
                "dim":{
                    "width": 100,
                    "height": 100
                },
                "rotation":{"x":-1.57}
            },
            "category": "Plane",
            "color" : "#0080ff",
            "position": {"x":100,"y":100}
        },
        {
            "meta":{
                "name": "TEEEEXT",
                defaultText: "This is a text"
            },
            "category": "Text",
            "color" : "#00ff00",
            "position": {"x":40,"y":10}
        }
    ]
}