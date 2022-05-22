const astar = new Entity();
astar.addComponent(new GLTFShape("models/walls.glb"))
astar.addComponent(new Transform({ position: new Vector3(0, 0, 96), rotation: Quaternion.Euler(0, 90, 0) }))
astar.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://astar.network/")
  }, {
    hoverText: "Astar is a polkadot parachain. Click to learn more.!",
    distance: 60
  })
)
engine.addEntity(astar);