import { GameObject } from '../core/class/GameObject/game-object';
import { Enemy } from './enemy';
import { Vector3 } from 'three';
import { Game } from '../game';
/**
 * PLAYER PROTOTYPE
 */
export class Enemies extends GameObject {
  moveDirection: number = 1;
  movementSpeed: number = 2000;
  maxMovementX: number = 0;
  minMovementX: number = 64;
  enemiesGO: Enemy[] = [];
  constructor(name: string) {
    super(
      name,
      { className: 'Enemies' },
      {
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(1, 1, 1),
      },
    );
    this.onAwake();
  }

  onAwake() {
    this.spawnRandom();
    this.maxMovementX = 64 * 13;
    super.onAwake();
  }

  onStart() {
    setTimeout(() => {
      this.move();
    }, this.movementSpeed);
    setInterval(() => {
      this.shoot();
    }, 1000);
  }

  onUpdate() {
    console.log(this.enemiesGO.length);
    if (this.enemiesGO.length === 0) {
      alert('stage cleared');
      Game.restart();
    }
  }

  move() {
    let { maxMovementX, minMovementX } = this;
    /// we need to move the plaeyr into a specific direction
    const targetMove = 64 * this.moveDirection;
    this.transform.position.x += targetMove;
    /// get the player current offset left
    /// change it according to current direction
    this.enemiesGO.map(ego => {
      ego.transform.position.x += targetMove;
    });
    if (
      this.transform.position.x > maxMovementX ||
      this.transform.position.x < minMovementX
    ) {
      this.moveDirection *= -1;
      setTimeout(() => {
        this.transform.position.y -= 64;
        this.enemiesGO.map(ego => {
          ego.transform.position.y -= 64;
        });
        this.movementSpeed -= this.movementSpeed / 8;
        this.movementSpeed = Math.max(500, this.movementSpeed);
      }, this.movementSpeed / 2);
    }

    setTimeout(() => {
      this.move();
    }, this.movementSpeed);
  }

  shoot() {
    const randomEnemy = this.enemiesGO[
      Math.floor(Math.random() * this.enemiesGO.length - 1) + 1
    ];
    if (!randomEnemy) {
      return;
    }
    randomEnemy.shoot();
  }

  onChildrenDestroy(children: Enemy) {
    const indexOf = this.enemiesGO.indexOf(children);
    if (indexOf > -1) {
      this.enemiesGO.splice(indexOf, 1);
    }
  }

  spawnRandom() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
      for (let j = 0; j < 15; j++) {
        this.enemiesGO.push(
          new Enemy(
            `Enemy${i}${j}`,
            new Vector3(-width / 2 + 64 * j + 64, height / 2 - 64 * i - 64, 0),
            this,
          ),
        );
      }
    }
  }
}
