// vec4 projectionMatrix;
// vec4 viewMatrix;
// vec4 modelMatrix;

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}