import * as THREE from 'three'

interface CardProps {
  width: number
  height: number
  radius: number
}

export default class ProfileCard {
  mesh: THREE.Mesh

  constructor({ width, height, radius }: CardProps) {
    const x = width / 2 - radius
    const y = height / 2 - radius

    const shape = new THREE.Shape()
    shape
      .absarc(x, y, radius, Math.PI / 2, 0, true)
      .lineTo(x + radius, -y)
      .absarc(x, -y, radius, 0, -Math.PI / 2, true)
      .lineTo(-x, -(y + radius))
      .absarc(-x, -y, radius, -Math.PI / 2, -Math.PI, true)
      .lineTo(-(x + radius), y)
      .absarc(-x, y, radius, -Math.PI, Math.PI / 2, true)

    const texture = new THREE.TextureLoader().load('profile.PNG')
    texture.repeat.set(0.05, 0.05)
    texture.offset.set(0.5, 0.6)

    const extrudeSettings = {
      depth: 0.01,
      bevelThickness: 0.1,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    const faceMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.5,
    })

    const sideMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6632,
    })

    const mesh = new THREE.Mesh(geometry, [faceMaterial, sideMaterial])

    this.mesh = mesh
  }
}
