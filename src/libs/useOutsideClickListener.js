/**
 * @module useOutsideClickListener
 * @category Utilities
 * @description Triggers a state change to false when a click occurs outside of
 * the referenced element. Optionally excludes an element that may be used for
 * more explicit state change, such as a button, that may perform the same
 * state change.
 * @param {object} ref - forwardRef to the element
 * @param {Function} setState - useState setState function
 * @param {string} [exclude=none] - Id of element to be excluded
 */

import { useEffect } from "react";

export default function useOutsideClickListener(ref, setState, exclude = null) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (exclude === null ||
          !document.getElementById(exclude).contains(event.target))
      ) {
        setState(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setState, exclude]);
}
