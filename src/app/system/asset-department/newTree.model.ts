import { TreeNode } from '../../../../node_modules/_primeng@4.3.0@primeng/primeng';
export interface NewTree {
  label?: string;
  data?: any;
  description: any;
  address: any;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: TreeNode;
  partialSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
}
