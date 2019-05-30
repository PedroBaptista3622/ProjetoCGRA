attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
varying float offset;


void main() {	
	vTextureCoord = aTextureCoord;

	offset = texture2D(uSampler2, vTextureCoord).b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xy, aVertexPosition.z+offset * 13.0, 1.0);
}
