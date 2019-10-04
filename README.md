## NOTES
Bullet should collide with a GameObject instance and not with an htmlElement, the problem is than the collision detection is between htmlElements, so I need to associate any htmlElement with a gameObject.

### Solution

Add an id to the gameObject class and:

1. Instantiate html with random id
2. Each GameObject must have its own htmlElement
  * I need to convert the enemies class with and array of Enemy game object
3. the core Game class must provide a **getGameObjectById(id: string)** method to get the gameObject reference


## TODO

1. Bullet as GameObject
2. Game Object automatism
3. htmlElement automatism
4. Enemies as gameObject
5. Sprite management

## TODO GAME

1. Steps - when you destroy all the enemies you can go to the next step
2. Player UI
3. Enemy life
4. Game intro
5. Scoreboard
6. Pause play and settings
7. Responsive
