export default {
    defaultValues: {
        start: 0,
        end: "max",
        reps: -1,
        dx: 0,
        dy: 0,
        delay: 80
    },
    animations: [
        {
            id: "mario_big_l_idle",
            film: "mario_big_left_idle",
            delay: 200
        },
        {
            id: "mario_big_r_idle",
            film: "mario_big_right_idle",
            delay: 200
        },
        {
            id: "mario_big_r_r",
            film: "mario_big_right_walking",
            dx: 20,
            delay: 70
        },
        {
            id: "mario_big_r_l",
            film: "mario_big_left_walking",
            dx: -20,
            delay: 70
        },
        {
            id: "coin_spin",
            film: "coin_spinning",
            delay: 90
        },
        {
            id: "coin_spin_fast",
            film: "coin_spinning",
            delay: 60
        },
        {
            id: "coin_pick",
            film: "coin_spinning",
            delay: 20,
            dy: -20,
            reps: 2
        },
        {
            id: "questblock_flick",
            film: "questblock_open",
            delay: 120
        },,
        {
            id: "goomba_walking_l",
            film: "goomba_walking",
            dx: -10,
            delay: 90
        },,
        {
            id: "goomba_walking_r",
            film: "goomba_walking",
            dx: 10,
            delay: 90
        },
    ]

}