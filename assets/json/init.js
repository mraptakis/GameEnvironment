export default {
    "meta": {
        "renderer": "three.js",
    },
    "objects": [
        {
            meta:{
                name: "BOOOOOX",
                texture: "./assets/textures/wood.jpeg",
                dim:{
                    width: 10,
                    height: 10,
                }
            },
            category: "Box",
            position: {x:45,y:40},
            color: "#ffff00"
        },
        {
            meta:{
                name: "SPHEEERE",
                texture: "./assets/textures/wood.jpeg"
            },
            category: "Sphere",
            color: "#ff00ff",
            position: {x:60,y:60}
        },
        {
            meta:{
                name: "SPHEEERE2",
                texture: "./assets/textures/wood.jpeg",
                dim: {width: 10, height: 10}
            },
            category: "Sphere",
            color: "#ff0000",
            position: {x:65,y:65}
        },
        {
            meta:{
                name: "SQUAAAARE"
            },
            category: "Square",
            color : "#00ffff",
            position: {x:90,y:10}
        },
        {
            meta:{
                name: "HUUUMAN"
            },
            category: "Humanoid",
            color : "#00ff00",
            position: {x:80,y:10}
        },
        {
            meta:{
                name: "TEEEEXT",
                defaultText: "This is a text"
            },
            category: "Text",
            color: "#00ff00",
            position: {x:40,y:20}
        },
        {
            meta:{
                name: "FLOOOOR",
                dim:{
                    width: 100,
                    height: 5
                },
            },
            attributes: [
                "isSolid"
            ],
            category: "Box",
            color: "#000000",
            position: {x:0,y:90}
        },
    ]
}