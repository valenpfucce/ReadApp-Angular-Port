import { JoinListaGuionPipe } from './join-lista-guion.pipe';

describe('JoinListaGuionPipe', () => {
  it('create an instance', () => {
    const pipe = new JoinListaGuionPipe();
    expect(pipe).toBeTruthy();
  })
  it('debería devolver la lista con guiones y cortar dependiendo de la cantidad dada', () => {
    const pipe = new JoinListaGuionPipe()
    const lista = ['libro1', 'libro2', 'libro3']
    const separador = ' - '
    const cuantoACortar = 2

    const resultado = pipe.transform(lista, separador, cuantoACortar)
    expect(resultado).toEqual('libro1 - libro2')
  })
})
