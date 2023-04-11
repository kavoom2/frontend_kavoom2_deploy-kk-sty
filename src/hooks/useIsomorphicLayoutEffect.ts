import { canUseDom } from "@/utils/browser";
import { useEffect, useLayoutEffect } from "react";

export default canUseDom ? useLayoutEffect : useEffect;
