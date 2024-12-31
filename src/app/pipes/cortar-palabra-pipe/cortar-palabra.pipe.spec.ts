import { CortarPalabraPipe } from './cortar-palabra.pipe';

describe('CortarPalabraPipe', () => {
  it('create an instance', () => {
    const pipe = new CortarPalabraPipe()
    expect(pipe).toBeTruthy()
  })
  it('pipe corta palabra a partir de determinada cantidad de caracteres', () => {
    const pipe = new CortarPalabraPipe()
    const string = "Recomendaciones"
    const limite = 12
    const nuevoString = pipe.transform(string, limite)
    expect(nuevoString).toEqual('Recomenda...')
  })
})
