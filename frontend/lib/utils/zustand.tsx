import { FC, PropsWithChildren, createContext, useContext, useRef } from 'react';
import { StoreApi, useStore } from 'zustand';

export function createProvider<S>(createStore: (init: Partial<S>) => StoreApi<S>) {
  const Context = createContext<ReturnType<typeof createStore> | null>(null);

  const Provider: FC<PropsWithChildren<Partial<S>>> = ({ children, ...props }) => {
    const storeRef = useRef<ReturnType<typeof createStore>>();
    if (!storeRef.current) storeRef.current = createStore(props as Partial<S>);
    return <Context.Provider value={storeRef.current}>{children}</Context.Provider>;
  };

  function useStoreContext<T>(selector: (state: S) => T, equalityFn?: (left: T, right: T) => boolean): T {
    const store = useContext(Context);
    if (!store) throw new Error('Missing context provider in the tree');
    return useStore(store, selector, equalityFn);
  }

  return { Context, Provider, useStoreContext };
}
