import type { DialogExample } from './types';

export const dialogExamples: DialogExample[] = [
  {
    label: 'Open dialog',
    config: undefined,
  },
  {
    label: 'Open dialog (custom title)',
    config: {
      title: 'Custom title',
    },
  },
  {
    label: 'Open dialog (single selection)',
    config: {
      multipleSelection: false,
    },
  },
  {
    label: 'Open dialog (only files)',
    config: {
      files: true,
      directories: false,
    },
  },
  {
    label: 'Open dialog (only directories)',
    config: {
      files: false,
      directories: true,
    },
  },
];

export const saveDialogExamples: DialogExample[] = [
  {
    label: 'Save dialog',
  },
  {
    label: 'Save dialog (custom title)',
    config: {
      title: 'Custom Save Title',
    },
  },
  {
    label: 'Save dialog (default file name)',
    config: {
      defaultName: 'default_file_name',
    },
  },
  {
    label: 'Save dialog (other types)',
    config: {
      allowedTypes: ['pdf', 'txt'],
      otherFileTypes: true,
    },
  },
  {
    label: 'Save dialog (limit types)',
    config: {
      allowedTypes: ['pdf', 'txt'],
      otherFileTypes: false,
    },
  },
  {
    label: "Save dialog (can't create directories)",
    config: {
      canCreateDirectories: false,
      title: 'canCreateDirectories: false',
    },
  },
];
