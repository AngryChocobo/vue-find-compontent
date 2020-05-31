// 递归遍历一个组件，向上查找最近的同名name组件
export function parent(component, componentName) {
  const parent = component.$parent;
  if (parent) {
    if (parent.$options.name === componentName) {
      return parent;
    } else {
      return parent(parent, componentName);
    }
  } else {
    return null;
  }
}

// 循环遍历一个组件，向上查找最近的同名name组件
export function parent2(component, componentName) {
  if (!componentName) {
    return null;
  }
  let parent = component.$parent;
  while (parent && parent.$options.name !== componentName) {
    parent = parent.$parent;
  }
  return parent;
}

// 递归遍历一个组件，向上查找所有的同名name组件
export function parents(component, componentName, components = []) {
  const parent = component.$parent;
  if (parent) {
    if (parent.$options.name === componentName) {
      components.push(parent);
    }
    return parents(parent, componentName, components);
  } else {
    return components;
  }
}

// 循环遍历一个组件，向上查找所有的同名name组件
export function parents2(component, componentName) {
  if (!componentName) {
    return [];
  }
  const components = [];
  let parent = component.$parent;
  while (parent) {
    if (parent.$options.name === componentName) {
      components.push(parent);
    }
    parent = parent.$parent;
  }
  return components;
}

// 递归遍历一个组件，向下查找最近的同名name组件
export function child(component, componentName) {
  const children = component.$children;
  if (children) {
    for (const _child of children) {
      if (_child.$options.name === componentName) {
        return _child;
      }
      return child(_child, componentName);
    }
  } else {
    return null;
  }
}

// 循环遍历一个组件，向下查找最近的同名name组件
export function child2(component, componentName) {
  let children = component.$children;
  let result = null;
  for (const child of children) {
    if (child.$options.name === componentName) {
      result = child;
      break;
    } else {
      result = child2(child, componentName);
      if (result) {
        break;
      }
    }
  }
  return result;
}

// 递归遍历一个组件，向下查找所有的同名name组件
export function children(component, componentName, components = []) {
  const _children = component.$children;
  // 这里不需要判断$children存在，因为$children默认值是空数组
  // 文章可以加入 使用reduce来优化的部分
  for (const child of _children) {
    if (child.$options.name === componentName) {
      components.push(child);
    }
    children(child, componentName, components);
  }
  return components;
}

// 递归遍历一个组件，向下查找所有的同名name组件 (reduce方法)
export function children2(component, componentName) {
  return component.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child);
    }
    const foundChildren = children2(child, componentName);
    return components.concat(foundChildren);
  }, []);
}

// 循环遍历一个组件，向下查找所有的同名name组件
export function children3(component, componentName) {
  const components = [];
  const stack = []; // 用栈来实现
  stack.push(component);
  while (stack.length) {
    const target = stack.pop();
    if (target.$options.name === componentName) {
      components.push(target);
    }
    const children = target.$children;
    if (children) {
      children.forEach((child) => {
        stack.push(child);
      });
    }
  }
  return components;
}
// 遍历一个组件，向下查找所有的兄弟name组件
export function brother(component, componentName, exceptSelf = true) {
  // 思路，先找他爹，在找爹的所有亲儿子
  const parent = component.$parent;
  let components = [];
  if (parent) {
    const children = parent.$children;
    components = children.filter(
      (child) => child.$options.name === componentName
    );
  }
  if (exceptSelf) {
    components.splice(components.indexOf(component), 1); // 也可以通过 component._uid来查找，_uid是不会重复的
  }
  return components;
}
