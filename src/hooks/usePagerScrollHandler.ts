import { useEvent, useHandler } from 'react-native-reanimated';

function usePagerScrollHandler(handlers: any, dependencies?: any) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent<any>(
    event => {
      'worklet';

      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer,
  );
}

export default usePagerScrollHandler;
