/* eslint-disable camelcase */
interface recipeStepPaused {
    cooking_time_weight_coefficient: null
    fan_speed: null
    heat_temperature: null
    is_pause: true
    microwave_power: null
    pause_time: number
    step: number
}
interface recipeStepUnpaused {
    cooking_time_weight_coefficient: number
    fan_speed: number
    heat_temperature: number
    is_pause: false
    microwave_power: number
    pause_time: null
    step: number
}

export type recipeStep = recipeStepPaused | recipeStepUnpaused
