export class Moonbeam extends Entity {
  polka = new Entity()

  constructor(transform: Transform) {
    super()
    engine.addEntity(this)
    this.addComponent(transform)
    this.initScene()
  }


  initScene() {

    this.polka.addComponent(new GLTFShape("models/man4.gltf"))
    this.polka.addComponent(new Transform({ position: new Vector3(222, -1, -5), scale: new Vector3(0.02, 0.02, 0.02), rotation: Quaternion.Euler(0, 270, 0) }))
    this.polka.setParent(this)
    this.polka.addComponent(
      new OnPointerDown(() => {
        openExternalURL("https://moonbeam.tech/claim")
      },
        { hoverText: "Buy my merch!",
        distance: 500, }
    )
    )

    // Moonbeam makes it easy to build decentralized applications on Polkadot — which means your DApps can integrate with other blockchains, including Bitcoin and Ethereum. With Moonbeam smart contracts and compatibility with the Ethereum developer toolset, you can quickly build applications that work with users and assets on remote chains, either through native Polkadot compatibility or bridge-based integrations.  
  }
}