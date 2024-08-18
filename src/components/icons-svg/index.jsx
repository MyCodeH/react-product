
import React from "react";
import { useMemo } from "react";
/**
 * @Svg组件
 * @props  color   图标颜色
 * @props  name 图标名称--文件名称
 * @props  size  图标大小
 * @props  prefix 前缀 默认icon
 */

export default function SvgIcon({
    fillClass,
    name,
    color,
    size = 16,
    iconClass,
    prefix = "icon",
}) {
    const symbolId = useMemo(() => `#${prefix}-${name}`, [prefix, name]);
    return (
        <svg aria-hidden="true" width={size} height={size} fill={color} >
            <use href={symbolId} fill={fillClass} className={iconClass} />
        </svg>
    );
}