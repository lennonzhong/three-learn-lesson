precision lowp float;
varying vec2 uUv;
varying float height;
uniform sampler2D uTexture;
void main() {
  float alpha = (height + 1.0) / 2.0 + 0.8;
  // gl_FragColor = vec4(1.0, 0.0, 0.0, alpha * 0.9);
  // uv采样
  vec4 color = texture2D(uTexture, uUv);
  // color.rgb *= alpha;
  gl_FragColor = color;
}