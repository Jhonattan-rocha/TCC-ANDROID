import Permission from 'react-native-permissions';

const requestStoragePermission = async () => {
  try {
    const permissions = [
      Permission.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      Permission.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      Permission.PERMISSIONS.ANDROID.RECORD_AUDIO,
      Permission.PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
      Permission.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      Permission.PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    ];

    for (const permission of permissions) {
      const granted = await Permission.request(permission, {
        title: 'Permissão de Armazenamento',
        message: 'Para melhorar a experiência do usuário, precisamos de permissão para gravar e ler dados no seu celular',
        buttonPositive: 'Permitir',
      });

      if (granted !== Permission.RESULTS.GRANTED) {
        console.log(granted);
        alert('Permissão de armazenamento negada.');
        return;
      }
    }

    alert('Permissões de armazenamento concedidas.');
  } catch (err) {
    console.warn(err);
  }
};

export const verifyPermissions = async () => {
  try {
    const permissionsToCheck = [
      Permission.PERMISSIONS.ANDROID.INTERNET,
      Permission.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      Permission.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      Permission.PERMISSIONS.ANDROID.RECORD_AUDIO,
      Permission.PERMISSIONS.ANDROID.ACCESS_NETWORK_STATE,
      Permission.PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
      Permission.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      Permission.PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      Permission.PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED,
    ];

    const permissionStatuses = await Promise.all(
      permissionsToCheck.map(permission => Permission.check(permission))
    );

    if (permissionStatuses.some(status => status === Permission.RESULTS.DENIED)) {
      await requestStoragePermission();
    }
  } catch (err) {
    alert(err);
  }
};
