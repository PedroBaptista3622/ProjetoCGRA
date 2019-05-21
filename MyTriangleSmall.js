/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, 1, 0,	//1
			1, 0, 0	    //2
		];

		this.normals = [];
		this.normals.push(0,0,1);
		this.normals.push(0,0,1);
		this.normals.push(0,0,1);
		this.normals.push(0,0,-1);
		this.normals.push(0,0,-1);
		this.normals.push(0,0,-1);

		//Counter-clockwise reference of vertices
		this.indices = [
			1, 0, 2,
			1, 2, 0
		];

		this.texCoords = [

			0, 0, //0
			0.25, 0.25, //1
			0, 0.5 //2

		]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

