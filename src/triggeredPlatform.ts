import * as utils from '@dcl/ecs-scene-utils'

export class TriggeredPlatform extends Entity {
  constructor(
    model: GLTFShape,
    transform: Transform,
    triggerShape: utils.TriggerBoxShape
  ) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(transform)

    // Create trigger for entity
    this.addComponent(
      new utils.TriggerComponent(triggerShape, {
        onCameraEnter: () => {
          this.getComponent(utils.ToggleComponent).toggle()
        },
        onCameraExit: () => {
          this.getComponent(utils.ToggleComponent).toggle()
        },
      })
    )

    this.addComponent(
      new utils.ToggleComponent(
        utils.ToggleState.Off,
        (value: utils.ToggleState) => {
          // Move the platform to the end position once the player steps onto the platform
          if (value == utils.ToggleState.On) {
            this.addComponentOrReplace(
              new utils.MoveTransformComponent(
                new Vector3(200, 0.1, 40),
                new Vector3(200, 40, 40),
                7
              )
            )
          } else {
            // Move the platform to the start position once the player falls off or leaves the platform
            this.addComponentOrReplace(
              new utils.MoveTransformComponent(
                this.getComponent(Transform).position,
                new Vector3(200, 0.1, 40),
                1.5
              )
            )
          }
        }
      )
    )
  }
}