class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
            -0.5, -0.5, -0.5,   //0
            -0.5, -0.5, -0.5,   //1
            -0.5, -0.5, -0.5,   //2

            -0.5, -0.5, 0.5,    //3
            -0.5, -0.5, 0.5,    //4
            -0.5, -0.5, 0.5,    //5

            -0.5, 0.5, 0.5,     //6
            -0.5, 0.5, 0.5,     //7
            -0.5, 0.5, 0.5,     //8

            0.5, 0.5, 0.5,      //9
            0.5, 0.5, 0.5,      //10
            0.5, 0.5, 0.5,      //11

            0.5, 0.5, -0.5,     //12
            0.5, 0.5, -0.5,     //13
            0.5, 0.5, -0.5,     //14

            0.5, -0.5, -0.5,    //15
            0.5, -0.5, -0.5,    //16
            0.5, -0.5, -0.5,    //17

            0.5, -0.5, 0.5,     //18
            0.5, -0.5, 0.5,     //19
            0.5, -0.5, 0.5,     //20

            -0.5, 0.5, -0.5,    //21
            -0.5, 0.5, -0.5,    //22
            -0.5, 0.5, -0.5     //23
            ];
            
            this.normals = [
                  0, 0, -1,
                  0, -1, 0,
                  -1, 0, 0,

                  0, 0, 1,
                  0, -1, 0,
                  -1, 0, 0,

                  0, 0, 1,
                  0, 1, 0,
                  -1, 0, 0,

                  0, 0, 1,
                  0, 1, 0,
                  1, 0, 0,

                  0, 0, -1,
                  0, 1, 0,
                  1, 0, 0,

                  0, 0, -1,
                  0, -1, 0,
                  1, 0, 0,

                  0, 0, 1,
                  0, -1, 0,
                  1, 0, 0,

                  0, 0, -1,
                  0, 1, 0,
                  -1, 0, 0
            ]

		//Counter-clockwise reference of vertices
		this.indices = [
            3, 9, 6,    //z positivo
            3, 18, 9,
            7, 10, 13,    //face y positivo
            13, 22, 7,
            20, 14, 11,    //face x positivo
            20, 17, 14,
            4, 16, 19,    //face y negativo
            4, 1, 16,
            5, 23, 2,    //face x negativo
            5, 8, 23,
            0, 21, 12,    //z negativo
            0, 12, 15
        ];

            this.texCoords = [

                  0.25, 2/3, //0 //z negativo
                  0.25, 2/3, //1 //face y negativo
                  0.25, 2/3, //2 //face x negativo

                  0.5, 2/3, //3 //z positivo 
                  0.5, 2/3, //4 //face y negativo
                  0.5, 2/3, //5 //face x negativo

                  0.5, 1/3, //6 //z positivo
                  0.5, 1/3, //7 //face y positivo
                  0.5, 1/3, //8 //face x negativo

                  0.75, 1/3, //9 //z positivo
                  0.5, 0, //10 //face y positivo
                  0.75, 1/3, //11 //face x positivo

                  0, 1/3, //12 //z negativo
                  0.25, 0, //13 //face y positivo
                  1, 1/3, //14 //face x positivo

                  0, 2/3, //15 //z negativo
                  0.25, 1, //16 //face y negativo
                  1, 2/3, //17 //face x positivo

                  0.75, 2/3, //18 //z positivo
                  0.50, 1,   //19 //face y negativo
                  0.75, 2/3, //20 //face x positivo 

                  0.25, 1/3, //21 //z negativo
                  0.25, 1/3, //22 //face y positivo
                  0.25, 1/3  //23 //face x negativo

            ]


		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
      }

      updateBuffers(){}
}

