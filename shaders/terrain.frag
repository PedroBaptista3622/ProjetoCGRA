#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float offset;

uniform sampler2D uSampler;
uniform sampler2D uSampler3;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 altimetry = texture2D(uSampler3, vec2(0.5,1.0 - offset));

	gl_FragColor = color*0.5 + altimetry*0.5;
}
