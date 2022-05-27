const astar = new Entity();
astar.addComponent(new GLTFShape("models/walls.glb"))
astar.addComponent(new Transform({ position: new Vector3(0, 0, 96), rotation: Quaternion.Euler(0, 90, 0) }))
engine.addEntity(astar);

const items = new Entity();
items.addComponent(new GLTFShape("models/words.glb"))
items.addComponent(new Transform({ position: new Vector3(0, 0, 96), rotation: Quaternion.Euler(0, 90, 0) }))
items.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://astar.network/")
  }, {
    hoverText: "Learn more about the Astar Network!",
    distance: 100
  })
)
engine.addEntity(items);

const items2 = new Entity();
items2.addComponent(new GLTFShape("models/monkey.glb"))
items2.addComponent(new Transform({ position: new Vector3(0, 0, 96), rotation: Quaternion.Euler(0, 90, 0) }))
items2.addComponent(
  new OnPointerDown(() => {
    openExternalURL("https://tofunft.com/collection/astardegens/items")
  }, {
    hoverText: "Check out our NFT collection!",
    distance: 100
  })
)
engine.addEntity(items2);

const socialDiscord = new Entity();
socialDiscord.addComponent(new GLTFShape("models/discord.glb"))
socialDiscord.addComponent(new Transform({ position: new Vector3(128, 12, 78), scale: new Vector3(10, 10, 1), rotation: Quaternion.Euler(0, 0, 0) }));
socialDiscord.addComponent(
  new OnPointerDown(() => {
    openExternalURL('https://discord.gg/fDjRg4XKRF')
  }, {
    hoverText: 'Check out the degens discord community',
    distance: 100
  })
)
engine.addEntity(socialDiscord);
