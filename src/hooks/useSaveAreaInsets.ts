import { useEffect, useState } from "react";

type Insets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

const useSafeAreaInsets = (defaultPadding = 16): Insets => {
  const [insets, setInsets] = useState<Insets>({
    top: defaultPadding,
    bottom: defaultPadding,
    left: defaultPadding,
    right: defaultPadding,
  });

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    function updateInsets() {
      if (tg?.safeAreaInset) {
        setInsets({
          top: tg.safeAreaInset.top + defaultPadding,
          bottom: tg.safeAreaInset.bottom + defaultPadding,
          left: tg.safeAreaInset.left + defaultPadding,
          right: tg.safeAreaInset.right + defaultPadding,
        });
      } else {
        setInsets({
          top: defaultPadding,
          bottom: defaultPadding,
          left: defaultPadding,
          right: defaultPadding,
        });
      }
    }

    updateInsets();

    window.addEventListener("resize", updateInsets);
    return () => window.removeEventListener("resize", updateInsets);
  }, [defaultPadding]);

  return insets;
}

export {
  useSafeAreaInsets,
};
