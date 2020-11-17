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
    name: "Budget",
    path: "/budget",
    hidden: false,
    redirect: "noRedirect",
    component: "Layout",
    alwaysShow: true,
    meta: {
      title: "预算执行",
      icon: "monitor"
    },
    children: [
      {
        name: "Decompose",
        path: "decompose",
        hidden: false,
        component: "budget/decompose/index",
        meta: {
          title: "预算分解",
          icon: ""
        }
      },
      {
        name: "Standing",
        path: "standing",
        hidden: true,
        component: "budget/Report/standing",
        meta: {
          title: "项目签报台账",
          icon: ""
        }
      },
      {
        name: "Info/:id",
        path: "info/:id",
        hidden: true,
        component: "budget/Report/info",
        meta: {
          title: "项目签报详情",
          icon: ""
        }
      },
      {
        name: "Infohistory/:id",
        path: "infohistory/:id",
        hidden: true,
        component: "budget/Report/infohistory",
        meta: {
          title: "项目签报详情",
          icon: ""
        }
      },
      {
        name: "Metaphase",
        path: "metaphase",
        hidden: false,
        component: "budget/metaphase/index",
        meta: {
          title: "中期预算调整",
          icon: ""
        }
      },
      {
        name: "ProjectReport",
        path: "projectReport",
        hidden: false,
        component: "budget/Report/standing",
        meta: {
          title: "项目签报",
          icon: ""
        }
      },
      {
        name: "Types",
        path: "types",
        hidden: false,
        component: "budget/Report/index",
        meta: {
          title: "项目类别",
          icon: ""
        },
        children: [
          {
            name: "Category",
            path: "category",
            hidden: false,
            component: "budget/category/index",
            meta: {
              title: "项目类别管理",
              icon: ""
            }
          },
          {
            name: "Protype",
            path: "protype",
            hidden: false,
            component: "budget/protypement/index",
            meta: {
              title: "项目类别管理详情",
              icon: ""
            }
          }
        ]
      },
      {
        name: "Mapping",
        path: "mapping",
        hidden: false,
        component: "budget/mapping/mapping",
        meta: {
          title: "预算业务活动映射",
          icon: ""
        }
      },
      {
        name: "Assessment",
        path: "assessment",
        hidden: false,
        component: "budget/assessment/index",
        meta: {
          title: "月度考核情况",
          icon: ""
        }
      },
      {
        name: "Schedule",
        path: "schedule",
        hidden: false,
        component: "budget/schedule/index",
        meta: {
          title: "预算目标与进度",
          icon: ""
        }
      },
      {
        name: "Daily",
        path: "daily",
        hidden: false,
        component: "budget/daily/index",
        meta: {
          title: "日常性费用申报",
          icon: ""
        }
      }
    ]
  },
  {
    name: "Invoice",
    path: "/invoice",
    hidden: false,
    redirect: "noRedirect",
    component: "Layout",
    alwaysShow: true,
    meta: {
      title: "渠道酬金管理",
      icon: "skill"
    },
    children: [
      {
        name: "Ledger",
        path: "ledger",
        hidden: false,
        component: "invoice/ledger/index",
        meta: {
          title: "应付台账管理",
          icon: "date"
        },
        children: [
          {
            name: "Detailedfee",
            path: "detailedfee",
            hidden: false,
            component: "invoice/ledger/detailedfee/index",
            meta: {
              title: "酬金计提明细管理",
              icon: "cascader"
            }
          },
          {
            name: "Contacts",
            path: "contacts",
            hidden: false,
            component: "invoice/ledger/contacts/index",
            meta: {
              title: "往来账",
              icon: "excel"
            }
          },
          {
            name: "Standingbook",
            path: "standingbook",
            hidden: false,
            component: "invoice/ledger/standingbook/index",
            meta: {
              title: "集中化应付台账管理",
              icon: "cascader"
            }
          },
          {
            name: "Contrast",
            path: "contrast",
            hidden: false,
            component: "invoice/ledger/contrast/index",
            meta: {
              title: "对比表",
              icon: "tree"
            }
          },
          {
            name: "Qualification",
            path: "qualification",
            hidden: false,
            component: "invoice/ledger/qualification/index",
            meta: {
              title: "渠道纳税人资质库",
              icon: "druid"
            }
          },
          {
            name: "Excitation",
            path: "excitation",
            hidden: false,
            component: "invoice/ledger/excitation/index",
            meta: {
              title: "综合激励",
              icon: "eye"
            }
          }
        ]
      },
      {
        name: "Remuneration",
        path: "remuneration",
        hidden: false,
        component: "invoice/remuneration/index",
        meta: {
          title: "酬金发票管理",
          icon: "money"
        },
        children: [
          {
            name: "Common",
            path: "common",
            hidden: false,
            component: "invoice/remuneration/common/index",
            meta: {
              title: "通用机打发票",
              icon: "tree"
            }
          },
          {
            name: "General_vat",
            path: "general_vat",
            hidden: false,
            component: "invoice/remuneration/general_vat/index",
            meta: {
              title: "增值税普票",
              icon: "tree"
            }
          },
          {
            name: "Pro_vat",
            path: "pro_vat",
            hidden: false,
            component: "invoice/remuneration/pro_vat/index",
            meta: {
              title: "增值税专票",
              icon: "tree"
            },
            children: [
              {
                name: "1vat",
                path: "1vat",
                hidden: false,
                component: "invoice/remuneration/pro_vat/1vat",
                meta: {
                  title: "1%增值税专票",
                  icon: "tree"
                }
              },
              {
                name: "3vat",
                path: "3vat",
                hidden: false,
                component: "invoice/remuneration/pro_vat/3vat",
                meta: {
                  title: "3%增值税专票",
                  icon: "tree"
                }
              },
              {
                name: "6vat",
                path: "6vat",
                hidden: false,
                component: "invoice/remuneration/pro_vat/6vat",
                meta: {
                  title: "6%增值税专票",
                  icon: "tree"
                }
              }
            ]
          },
          {
            name: "Library",
            path: "library",
            hidden: false,
            component: "invoice/remuneration/library/index",
            meta: {
              title: "增值税发票库",
              icon: "chart"
            }
          },
          {
            name: "Check",
            path: "check",
            hidden: false,
            component: "invoice/remuneration/check/index",
            meta: {
              title: "增值税发票查验",
              icon: "clipboard"
            }
          }
        ]
      },
      {
        name: "Reimbursement",
        path: "reimbursement",
        hidden: false,
        component: "invoice/reimbursement/index",
        meta: {
          title: "支付报账管理",
          icon: "job"
        },
        children: [
          {
            name: "Grant",
            path: "grant",
            hidden: false,
            component: "invoice/reimbursement/grant_table/index",
            meta: {
              title: "酬金发放表管理",
              icon: "cascader"
            }
          },
          {
            name: "Payment",
            path: "payment",
            hidden: false,
            component: "invoice/reimbursement/payment/index",
            meta: {
              title: "酬金支付不超往来表",
              icon: "date-range"
            }
          }
        ]
      }
    ]
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
            name: "name",
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
  {
    name: "System",
    path: "/system",
    hidden: false,
    redirect: "noRedirect",
    component: "Layout",
    alwaysShow: true,
    meta: {
      title: "系统管理",
      icon: "system"
    },
    children: [
      {
        name: "User",
        path: "user",
        hidden: false,
        redirect: "noRedirect",
        component: "system/user/index",
        alwaysShow: true,
        meta: {
          title: "用户管理",
          icon: "peoples"
        },
        children: [
          {
            name: "Userinfo",
            path: "userinfo",
            hidden: false,
            component: "system/user/userinfo",
            meta: {
              title: "用户信息",
              icon: "people"
            }
          },
          {
            name: "Role",
            path: "role",
            hidden: false,
            component: "system/user/role/index",
            meta: {
              title: "用户菜单权限",
              icon: "list"
            }
          },
          {
            name: "Dept",
            path: "dept",
            hidden: false,
            component: "system/user/dept/index",
            meta: {
              title: "用户部门权限",
              icon: "tree"
            }
          }
        ]
      },
      {
        name: "Unit",
        path: "unit",
        hidden: false,
        component: "system/unit/index",
        meta: {
          title: "部门管理",
          icon: "component"
        }
      },
      {
        name: "Notice",
        path: "notice",
        hidden: false,
        component: "system/notice/index",
        meta: {
          title: "通知管理",
          icon: "message"
        }
      },
      {
        name: "Resource",
        path: "resource",
        hidden: false,
        component: "system/resource/index",
        meta: {
          title: "资源管理",
          icon: "shopping"
        }
      }
    ]
  },
  {
    name: "Fund",
    path: "/fund",
    hidden: false,
    redirect: "noRedirect",
    component: "Layout",
    alwaysShow: true,
    meta: {
      title: "客户资金",
      icon: "money"
    },
    children: [
      {
        name: "Select",
        path: "select",
        hidden: false,
        component: "fund/fundSelect/index",
        meta: {
          title: "客户资金查询",
          icon: "chart"
        }
      },
      {
        name: "FundStat",
        path: "fundStat",
        hidden: false,
        component: "fund/fundStatistics/index",
        meta: {
          title: "客户资金统计",
          icon: "table"
        }
      },
      {
        name: "Management",
        path: "management",
        hidden: false,
        component: "fund/management/index",
        meta: {
          title: "发票预开管理",
          icon: "dict"
        }
      },
      {
        name: "Maintenance",
        path: "maintenance",
        hidden: false,
        component: "fund/maintenance/index",
        meta: {
          title: "客户数据维护",
          icon: "education"
        }
      }
    ]
  },
  {
    name: "Relocation",
    path: "/relocation",
    hidden: false,
    redirect: "noRedirect",
    component: "Layout",
    alwaysShow: true,
    meta: {
      title: "迁改管理",
      icon: "client"
    },
    children: [
      {
        name: "Basis",
        path: "basis",
        hidden: false,
        redirect: "noRedirect",
        component: "relocation/basis",
        alwaysShow: true,
        meta: {
          title: "基础信息管理表",
          icon: "education"
        },
        children: [
          {
            name: "Projects",
            path: "projects",
            hidden: false,
            component: "relocation/basis/projects/index",
            meta: {
              title: "项目信息表",
              icon: "build"
            }
          },
          {
            name: "Invoice",
            path: "invoice",
            hidden: false,
            component: "relocation/basis/invoice/index",
            meta: {
              title: "发票管理",
              icon: "clipboard"
            }
          },
          {
            name: "Receipt",
            path: "receipt",
            hidden: false,
            component: "relocation/basis/receipt/index",
            meta: {
              title: "收据管理",
              icon: "excel"
            }
          },
          {
            name: "Receivables",
            path: "receivables",
            hidden: false,
            component: "relocation/basis/receivables/index",
            meta: {
              title: "收款管理",
              icon: "checkbox"
            }
          }
        ]
      },
      {
        name: "Form",
        path: "form",
        hidden: false,
        redirect: "noRedirect",
        component: "relocation/form",
        alwaysShow: true,
        meta: {
          title: "报表管理",
          icon: "education"
        },
        children: [
          {
            name: "Business",
            path: "business",
            hidden: false,
            component: "relocation/form/business/index",
            meta: {
              title: "业务统计表报",
              icon: "clipboard"
            }
          },
          {
            name: "Wealth",
            path: "wealth",
            hidden: false,
            component: "relocation/form/wealth/index",
            meta: {
              title: "涉财统计报表",
              icon: "money"
            }
          }
        ]
      },
      {
        name: "Warning",
        path: "warning",
        hidden: false,
        redirect: "noRedirect",
        component: "relocation/warning",
        alwaysShow: true,
        meta: {
          title: "预警管理",
          icon: "bug"
        },
        children: [
          {
            name: "Prompt",
            path: "prompt",
            hidden: false,
            component: "relocation/warning/prompt/index",
            meta: {
              title: "提示信息管理",
              icon: "email"
            }
          }
        ]
      }
    ]
  },
  {
    name: "Propaganda",
    path: "/propaganda",
    hidden: false,
    redirect: "noRedirect",
    component: "Layout",
    alwaysShow: true,
    meta: {
      title: "宣传用品管理",
      icon: "chart"
    },
    children: [
      {
        name: "Flyer",
        path: "flyer",
        hidden: false,
        component: "propaganda/flyer.vue",
        meta: {
          title: "宣传单页申领",
          icon: "date-range"
        }
      },
      {
        name: "Summary",
        path: "summary",
        hidden: false,
        component: "propaganda/summary.vue",
        meta: {
          title: "分公司汇总",
          icon: "cascader"
        }
      },
      {
        name: "Cost",
        path: "cost",
        hidden: false,
        component: "propaganda/cost.vue",
        meta: {
          title: "费用签报",
          icon: "edit"
        }
      },
      {
        name: "Demand",
        path: "demand",
        hidden: false,
        component: "propaganda/demand.vue",
        meta: {
          title: "采购需求汇总",
          icon: "international"
        }
      },
      {
        name: "Material",
        path: "material",
        hidden: false,
        component: "propaganda/material.vue",
        meta: {
          title: "宣传物料库",
          icon: "shopping"
        }
      },
      {
        name: "Printed",
        path: "printed",
        hidden: false,
        component: "propaganda/printed.vue",
        meta: {
          title: "印刷品申请",
          icon: "dict"
        }
      },
      {
        name: "Design",
        path: "design",
        hidden: false,
        component: "propaganda/design.vue",
        meta: {
          title: "宣传画面设计申请",
          icon: "client"
        }
      },
      {
        name: "Poster",
        path: "poster",
        hidden: false,
        component: "propaganda/poster.vue",
        meta: {
          title: "宣传物料制作申请",
          icon: "color"
        }
      },
      {
        name: "Control",
        path: "control",
        hidden: false,
        component: "propaganda/control.vue",
        meta: {
          title: "制作申请预算控制",
          icon: "chart"
        }
      }
    ]
  }
]