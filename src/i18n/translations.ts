export type Language = "en" | "es" | "zh";

export const translations = {
  en: {
    // Header
    appTitle: "IEP Meeting Preparation Tool",
    appSubtitle: "Organize your thoughts and questions before your child's IEP meeting",
    saveProgress: "Save Progress",
    export: "Export",
    
    // Tabs
    tabSnapshot: "Meeting Snapshot",
    tabAttendees: "Attendees",
    tabPrep: "Pre-Meeting Prep",
    tabQuestions: "Question Bank",
    tabDecisions: "Decision Tracker",
    tabFollowUp: "Follow-Up",
    tabFamily: "Family Discussions",
    
    // Meeting Snapshot
    studentInfo: "Student Information",
    studentName: "Student Name",
    grade: "Grade",
    school: "School",
    meetingDate: "Meeting Date",
    meetingType: "Meeting Type",
    primaryConcerns: "Primary Concerns",
    parentContact: "Parent/Guardian Contact Information",
    contactName: "Your Name",
    phone: "Phone",
    email: "Email",
    selectMeetingType: "Select meeting type",
    annualReview: "Annual Review",
    initialIep: "Initial IEP",
    reevaluation: "Re-evaluation",
    amendmentMeeting: "Amendment Meeting",
    transitionMeeting: "Transition Meeting",
    progressMeeting: "Progress Meeting",
    
    // Attendee List
    attendeeListTitle: "IEP Team Attendee List",
    attendeeListDesc: "Keep track of who will be at the meeting and their contact information",
    role: "Role",
    name: "Name",
    attending: "Attending?",
    contactInfo: "Contact Info",
    yes: "Yes",
    no: "No",
    maybe: "Maybe",
    selectOption: "Select...",
    addAttendee: "Add Attendee",
    
    // Pre-Meeting Prep
    documentsTitle: "Documents to Gather Before the Meeting",
    documentsDesc: "Check off each document as you collect it",
    reflectionTitle: "Parent Reflection",
    reflectionDesc: "Take some time to think about these questions before the meeting",
    topConcerns: "What are your top 2-3 concerns you want addressed?",
    strengths: "What are your child's strengths?",
    challenges: "What challenges do you see at home?",
    homeSupports: "What supports are working at home?",
    
    // Decision Tracker
    decisionTrackerTitle: "During-Meeting Decision Tracker",
    decisionTrackerDesc: "Fill this out during the meeting so you don't walk out thinking, \"Wait, what did we even decide?\"",
    addDecision: "Add Decision",
    topicIssue: "Topic / Issue",
    whatTeamSaid: "What the Team Said / Decided",
    servicesAgreed: "Services/Changes Agreed On",
    whoResponsible: "Who is Responsible",
    byWhen: "By When",
    noDecisions: "No decisions tracked yet. Click \"Add Decision\" during your meeting.",
    topicPlaceholder: "Reading Support",
    discussedPlaceholder: "What was discussed...",
    agreedPlaceholder: "What was agreed upon...",
    responsiblePlaceholder: "Name or role",
    
    // Default topics
    readingSupport: "Reading Support",
    mathSupport: "Math Support",
    behaviorPlan: "Behavior Plan",
    accommodations: "Accommodations",
    progressUpdates: "Progress Updates",
    otherConcerns: "Other Parent Concerns",
    
    // Follow-Up
    followUpTitle: "Post-Meeting Follow-Up",
    immediatelyAfter: "Immediately After the Meeting",
    withinOneWeek: "Within 1 Week",
    monthlyCheckIn: "Monthly Check-In Log",
    addMonth: "Add Month",
    
    // Toast messages
    saveSuccess: "Progress saved successfully!",
    
    // Language names
    english: "English",
    spanish: "Español",
    chinese: "中文",
  },
  es: {
    // Header
    appTitle: "Herramienta de Preparación para Reuniones IEP",
    appSubtitle: "Organice sus pensamientos y preguntas antes de la reunión IEP de su hijo/a",
    saveProgress: "Guardar",
    export: "Exportar",
    
    // Tabs
    tabSnapshot: "Resumen",
    tabAttendees: "Asistentes",
    tabPrep: "Preparación",
    tabQuestions: "Preguntas",
    tabDecisions: "Decisiones",
    tabFollowUp: "Seguimiento",
    tabFamily: "Discusiones",
    
    // Meeting Snapshot
    studentInfo: "Información del Estudiante",
    studentName: "Nombre del Estudiante",
    grade: "Grado",
    school: "Escuela",
    meetingDate: "Fecha de la Reunión",
    meetingType: "Tipo de Reunión",
    primaryConcerns: "Preocupaciones Principales",
    parentContact: "Información de Contacto del Padre/Tutor",
    contactName: "Su Nombre",
    phone: "Teléfono",
    email: "Correo Electrónico",
    selectMeetingType: "Seleccione tipo de reunión",
    annualReview: "Revisión Anual",
    initialIep: "IEP Inicial",
    reevaluation: "Re-evaluación",
    amendmentMeeting: "Reunión de Enmienda",
    transitionMeeting: "Reunión de Transición",
    progressMeeting: "Reunión de Progreso",
    
    // Attendee List
    attendeeListTitle: "Lista de Asistentes del Equipo IEP",
    attendeeListDesc: "Lleve un registro de quién asistirá a la reunión y su información de contacto",
    role: "Rol",
    name: "Nombre",
    attending: "¿Asistirá?",
    contactInfo: "Información de Contacto",
    yes: "Sí",
    no: "No",
    maybe: "Tal vez",
    selectOption: "Seleccionar...",
    addAttendee: "Agregar Asistente",
    
    // Pre-Meeting Prep
    documentsTitle: "Documentos para Reunir Antes de la Reunión",
    documentsDesc: "Marque cada documento a medida que lo recopile",
    reflectionTitle: "Reflexión del Padre",
    reflectionDesc: "Tómese un tiempo para pensar en estas preguntas antes de la reunión",
    topConcerns: "¿Cuáles son sus 2-3 principales preocupaciones que desea abordar?",
    strengths: "¿Cuáles son las fortalezas de su hijo/a?",
    challenges: "¿Qué desafíos observa en casa?",
    homeSupports: "¿Qué apoyos funcionan en casa?",
    
    // Decision Tracker
    decisionTrackerTitle: "Registro de Decisiones Durante la Reunión",
    decisionTrackerDesc: "Complete esto durante la reunión para no salir pensando, \"Espera, ¿qué decidimos?\"",
    addDecision: "Agregar Decisión",
    topicIssue: "Tema / Asunto",
    whatTeamSaid: "Lo que el Equipo Dijo / Decidió",
    servicesAgreed: "Servicios/Cambios Acordados",
    whoResponsible: "Quién es Responsable",
    byWhen: "Para Cuándo",
    noDecisions: "No hay decisiones registradas. Haga clic en \"Agregar Decisión\" durante su reunión.",
    topicPlaceholder: "Apoyo en Lectura",
    discussedPlaceholder: "Lo que se discutió...",
    agreedPlaceholder: "Lo que se acordó...",
    responsiblePlaceholder: "Nombre o rol",
    
    // Default topics
    readingSupport: "Apoyo en Lectura",
    mathSupport: "Apoyo en Matemáticas",
    behaviorPlan: "Plan de Comportamiento",
    accommodations: "Acomodaciones",
    progressUpdates: "Actualizaciones de Progreso",
    otherConcerns: "Otras Preocupaciones",
    
    // Follow-Up
    followUpTitle: "Seguimiento Post-Reunión",
    immediatelyAfter: "Inmediatamente Después de la Reunión",
    withinOneWeek: "Dentro de 1 Semana",
    monthlyCheckIn: "Registro de Verificación Mensual",
    addMonth: "Agregar Mes",
    
    // Toast messages
    saveSuccess: "¡Progreso guardado exitosamente!",
    
    // Language names
    english: "English",
    spanish: "Español",
    chinese: "中文",
  },
  zh: {
    // Header
    appTitle: "IEP会议准备工具",
    appSubtitle: "在孩子的IEP会议之前整理您的想法和问题",
    saveProgress: "保存",
    export: "导出",
    
    // Tabs
    tabSnapshot: "会议概览",
    tabAttendees: "参会人员",
    tabPrep: "会前准备",
    tabQuestions: "问题库",
    tabDecisions: "决策追踪",
    tabFollowUp: "后续跟进",
    tabFamily: "家庭讨论",
    
    // Meeting Snapshot
    studentInfo: "学生信息",
    studentName: "学生姓名",
    grade: "年级",
    school: "学校",
    meetingDate: "会议日期",
    meetingType: "会议类型",
    primaryConcerns: "主要关注点",
    parentContact: "家长/监护人联系方式",
    contactName: "您的姓名",
    phone: "电话",
    email: "电子邮件",
    selectMeetingType: "选择会议类型",
    annualReview: "年度审查",
    initialIep: "初始IEP",
    reevaluation: "重新评估",
    amendmentMeeting: "修订会议",
    transitionMeeting: "过渡会议",
    progressMeeting: "进度会议",
    
    // Attendee List
    attendeeListTitle: "IEP团队参会人员名单",
    attendeeListDesc: "记录将参加会议的人员及其联系方式",
    role: "角色",
    name: "姓名",
    attending: "是否参加？",
    contactInfo: "联系方式",
    yes: "是",
    no: "否",
    maybe: "待定",
    selectOption: "请选择...",
    addAttendee: "添加参会人员",
    
    // Pre-Meeting Prep
    documentsTitle: "会议前需要收集的文件",
    documentsDesc: "收集每份文件后进行勾选",
    reflectionTitle: "家长反思",
    reflectionDesc: "在会议之前花些时间思考这些问题",
    topConcerns: "您希望解决的2-3个主要关注点是什么？",
    strengths: "您孩子的优势是什么？",
    challenges: "您在家中观察到哪些挑战？",
    homeSupports: "哪些家庭支持措施有效？",
    
    // Decision Tracker
    decisionTrackerTitle: "会议期间决策追踪器",
    decisionTrackerDesc: "在会议期间填写此表，这样您就不会走出会议室时想：'等等，我们到底决定了什么？'",
    addDecision: "添加决策",
    topicIssue: "主题/问题",
    whatTeamSaid: "团队讨论/决定的内容",
    servicesAgreed: "商定的服务/变更",
    whoResponsible: "负责人",
    byWhen: "截止日期",
    noDecisions: "尚未记录任何决策。在会议期间点击\"添加决策\"。",
    topicPlaceholder: "阅读支持",
    discussedPlaceholder: "讨论的内容...",
    agreedPlaceholder: "达成的协议...",
    responsiblePlaceholder: "姓名或角色",
    
    // Default topics
    readingSupport: "阅读支持",
    mathSupport: "数学支持",
    behaviorPlan: "行为计划",
    accommodations: "调整措施",
    progressUpdates: "进度更新",
    otherConcerns: "其他家长关注点",
    
    // Follow-Up
    followUpTitle: "会后跟进",
    immediatelyAfter: "会议结束后立即",
    withinOneWeek: "一周内",
    monthlyCheckIn: "每月检查记录",
    addMonth: "添加月份",
    
    // Toast messages
    saveSuccess: "进度保存成功！",
    
    // Language names
    english: "English",
    spanish: "Español",
    chinese: "中文",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
