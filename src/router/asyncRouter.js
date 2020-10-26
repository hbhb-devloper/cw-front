import Layout from '@/layout'
export const asyncRouter = [
  {
    path: "/",
    hidden: false,
    perms: "工作台",
    component: 'Layout',
    meta: {
      title: "工作台",
      icon: "client"
    }
  },
  {
    name: "Flow",
    path: "/flow",
    hidden: false,
    redirect: "noRedirect",
    component: 'Layout',
    meta: {
      title: "流程维护",
      icon: "build"
    },
    children: [
      {
        name: "Customize",
        path: "customize",
        hidden: false,
        redirect: "noRedirect",
        component: 'flow/customize',
        meta: {
          title: "流程定制",
          icon: "cascader"
        },
        children: [
          {
            name: "Name",
            path: "name",
            hidden: true,
            perms: "流程名称",
            component: 'flow/customize/name/index',
            meta: {
              title: "流程名称",
              icon: "user"
            }
          },
          {
            name: "Type",
            path: "type",
            hidden: false,
            perms: "流程类型",
            component: 'flow/customize/type/index',
            meta: {
              title: "流程类型",
              icon: "drag"
            }
          },
          {
            name: "List",
            path: "list",
            hidden: false,
            perms: "流程列表",
            component: 'flow/customize/list/index',
            meta: {
              title: "流程列表",
              icon: "tree-table"
            }
          },
          {
            name: "Vfd",
            path: "vfd/:flowId",
            hidden: true,
            perms: "流程详情",
            component: 'flow/customize/vfd/index',
            meta: {
              title: "流程详情",
              icon: "checkbox"
            }
          },
          {
            name: "Node",
            path: "node",
            hidden: false,
            perms: "流程节点列表",
            component: 'flow/customize/node/index',
            meta: {
              title: "流程节点列表",
              icon: "drag"
            }
          }
        ]
      },
      {
        name: "Role",
        path: "role",
        hidden: false,
        redirect: "noRedirect",
        component: 'flow/role',
        meta: {
          title: "流程角色",
          icon: "user"
        },
        children: [
          {
            name: "List",
            path: "list",
            hidden: false,
            perms: "角色库",
            component: 'flow/role/list',
            meta: {
              title: "角色库",
              icon: "peoples"
            }
          },
          {
            name: "Flowrole",
            path: "flowrole",
            hidden: false,
            perms: "流程角色列表",
            component: 'flow/role/flowrole',
            meta: {
              title: "流程角色列表",
              icon: "example"
            }
          },
          {
            name: "Assign",
            path: "assign",
            hidden: false,
            perms: "角色分配",
            component: 'flow/role/assign',
            meta: {
              title: "角色分配",
              icon: "drag"
            }
          }
        ]
      },
      {
        name: "Remind",
        path: "remind",
        hidden: false,
        perms: "提醒库管理",
        component: 'flow/remind/index',
        meta: {
          title: "提醒库管理",
          icon: "message"
        }
      },
      {
        name: "Opinion",
        path: "opinion",
        hidden: false,
        perms: "审批意见管理",
        component: 'flow/opinion/index',
        meta: {
          title: "审批意见管理",
          icon: "form"
        }
      }
    ]
  },
]