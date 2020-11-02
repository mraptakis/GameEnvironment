export default {
    state:{
        name: 'initial_pac',
        background_color: '#000000',
        background: './assets/textures/sky.jpeg'
    },
    objects: [
        {
            meta:{
                name: "player",
                dim: {
                    width: 60,
                    height: 120
                },
                film: "mario_big_right_idle"
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:500,y:750}
        },
        {
            meta:{
                name: "coin1",
                dim: {
                    width: 20,
                    height: 35
                },
                film: "coin_spinning"
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:600,y:460}
        },
        {
            meta:{
                name: "coin2",
                dim: {
                    width: 20,
                    height: 35
                },
                film: "coin_spinning"
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:700,y:460}
        },
        {
            meta:{
                name: "coin3",
                dim: {
                    width: 20,
                    height: 35
                },
                film: "coin_spinning"
            },
            category: "Rectangle",
            color : "#ffffff",
            position: {x:800,y:460}
        },
        {
            meta:{
                name: "score",
            },
            fields: {
                counter: 0
            },
            events: [
                "increaseCounterAndShow"
            ],
            attributes: {
                isCollidable: false
            },
            category: "Text",
            color : "#ffffff",
            position: {x:1150,y:100}
        },
        {
            meta:{
                name: "floor",
                dim: {
                    width: 1920,
                    height: 80
                }
            },
            attributes: {
                isSolid: true,
                isMovable: false
            },
            category: "Rectangle",
            color : "#00ff00",
            position: {x:0,y:870}
        }
    ]
}