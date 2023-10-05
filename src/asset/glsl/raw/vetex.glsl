uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
attribute vec3 position;
attribute vec2 uv;

precision lowp float;
varying vec2 uUv;
varying float height;
uniform float uTime;
void main() {
  uUv = uv;
  vec4 modelData = modelMatrix * vec4(position, 1.0);
  modelData.z = sin(modelData.x + uTime * 10.0);
  modelData.z += sin(modelData.y + uTime * 3.0);
  height = modelData.z;
  gl_Position = projectionMatrix * viewMatrix * modelData;
}