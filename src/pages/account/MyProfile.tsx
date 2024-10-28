import * as React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Avatar } from '@/components/ui/avatar.tsx';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { z } from 'zod';

export default function MyProfile() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const emailSchema = z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' });

  const [formData, setFormData] = useState({
    avatar: '/path/to/profile.jpg',
    username: '이름',
    email: '이메일@example.com',
    birthday: '1990-01-01',
    location: '서울특별시',
    language: '한국어',
    bio: 'Always learning and exploring new technologies.',
    externalUrl: 'https://example.com',
    interests: '웹 개발, 프론트엔드 개발, 운동',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });

    // 유효성 검사
    if (field === 'email') {
      try {
        emailSchema.parse(value);
        setErrors((prev) => ({ ...prev, email: '' }));
      } catch (e) {
        if (e instanceof z.ZodError) {
          setErrors((prev) => ({ ...prev, email: e.errors[0].message }));
        }
      }
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        avatar: URL.createObjectURL(e.target.files[0]),
      });
      setEditingField(null);
    }
  };

  return (
      <div className='flex min-h-screen'>
        <Card className='w-full shadow-md'>
          <CardHeader className='flex flex-col items-center py-8'>
            <div className='relative'>
              <Avatar className='w-32 h-32 mb-6 border rounded-b-full'/>
              <div
                  className='absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 p-2 rounded-full shadow-md cursor-pointer'>
                <label htmlFor='avatar-input'>
                  <PencilIcon className='h-6 w-6'/>
                </label>
                <input
                    id='avatar-input'
                    type='file'
                    accept='image/*'
                    onChange={handleAvatarChange}
                    className='hidden'
                />
              </div>
            </div>
            {editingField === 'username' ? (
                <input
                    type='text'
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className='border rounded-md p-2 bg-gray-100 dark:bg-gray-700 font-bold text-3xl'
                />
            ) : (
                <CardTitle className='text-3xl font-bold'>
                  {formData.username}
                </CardTitle>
            )}
          </CardHeader>
          <CardContent className='w-full p-8'>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-medium  mb-2'>사용자 이름</h2>
                {editingField === 'username' ? (
                    <input
                        type='text'
                        value={formData.username}
                        onChange={(e) =>
                            handleInputChange('username', e.target.value)
                        }
                        className='w-full border rounded-md p-2 bg-gray-100 dark:bg-gray-700'
                    />
                ) : (
                    <p className=''>{formData.username}</p>
                )}
              </div>
              <button
                  className='p-2 rounded-full'
                  onClick={() =>
                      setEditingField(editingField === 'username' ? null : 'username')
                  }
              >
                <PencilIcon className='h-6 w-6'/>
              </button>
            </div>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-medium mb-2'>이메일</h2>
                {editingField === 'email' ? (
                    <div>
                      <input
                          type='text'
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className='w-full border rounded-md p-2 bg-gray-100 dark:bg-gray-700'
                      />
                      {errors.email && (
                          <p className='text-red-500 mt-1'>{errors.email}</p>
                      )}
                    </div>
                ) : (
                    <p className=''>{formData.email}</p>
                )}
              </div>
              <button
                  className='p-2 rounded-full'
                  onClick={() =>
                      setEditingField(editingField === 'email' ? null : 'email')
                  }
              >
                <PencilIcon className='h-6 w-6'/>
              </button>
            </div>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-medium mb-2'>생일</h2>
                {editingField === 'birthday' ? (
                    <input
                        type='text'
                        value={formData.birthday}
                        onChange={(e) =>
                            handleInputChange('birthday', e.target.value)
                        }
                        className='w-full border rounded-md p-2 bg-gray-100 dark:bg-gray-700'
                    />
                ) : (
                    <p className=''>{formData.birthday}</p>
                )}
              </div>
              <button
                  className='p-2 rounded-full'
                  onClick={() =>
                      setEditingField(editingField === 'birthday' ? null : 'birthday')
                  }
              >
                <PencilIcon className='h-6 w-6'/>
              </button>
            </div>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-medium mb-2'>지역</h2>
                {editingField === 'location' ? (
                    <Select
                        value={formData.location}
                        onValueChange={(value) => handleInputChange('location', value)}
                    >
                      <SelectTrigger className='w-full border rounded-md p-2'>
                        <SelectValue placeholder="지역을 선택하세요"/>
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "서울특별시",
                          "부산광역시",
                          "대구광역시",
                          "인천광역시",
                          "광주광역시",
                          "대전광역시",
                          "울산광역시",
                          "세종특별자치시",
                          "경기도",
                          "강원도",
                          "충청북도",
                          "충청남도",
                          "전라북도",
                          "전라남도",
                          "경상북도",
                          "경상남도",
                          "제주특별자치도",
                        ].map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                ) : (
                    <p className=''>{formData.location}</p>
                )}
              </div>
              <button
                  className='p-2 rounded-full'
                  onClick={() =>
                      setEditingField(editingField === 'location' ? null : 'location')
                  }
              >
                <PencilIcon className='h-6 w-6'/>
              </button>
            </div>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-medium mb-2'>주 언어</h2>
                {editingField === 'language' ? (
                    <Select
                        value={formData.language}
                        onValueChange={(value) => handleInputChange('language', value)}
                    >
                      <SelectTrigger className='w-full border rounded-md p-2'>
                        <SelectValue placeholder="언어를 선택하세요"/>
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          '한국어',
                          '영어',
                          '일본어',
                          '중국어',
                          '스페인어',
                          '프랑스어',
                          '독일어',
                          '이탈리아어',
                          '러시아어',
                          '아랍어',
                          '힌디어',
                          '포르투갈어',
                        ].map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                ) : (
                    <p className=''>{formData.language}</p>
                )}
              </div>
              <button
                  className='p-2 rounded-full'
                  onClick={() =>
                      setEditingField(editingField === 'language' ? null : 'language')
                  }
              >
                <PencilIcon className='h-6 w-6'/>
              </button>
            </div>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-medium mb-2'>자기소개</h2>
                {editingField === 'bio' ? (
                    <input
                        type='text'
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className='w-full border rounded-md p-2 bg-gray-100 dark:bg-gray-700'
                    />
                ) : (
                    <p className=''>{formData.bio}</p>
                )}
              </div>
              <button
                  className='p-2 rounded-full'
                  onClick={() =>
                      setEditingField(editingField === 'bio' ? null : 'bio')
                  }
              >
                <PencilIcon className='h-6 w-6'/>
              </button>
            </div>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-medium mb-2'>외부 URL</h2>
                {editingField === 'externalUrl' ? (
                    <input
                        type='text'
                        value={formData.externalUrl}
                        onChange={(e) =>
                            handleInputChange('externalUrl', e.target.value)
                        }
                        className='w-full border rounded-md p-2 bg-gray-100 dark:bg-gray-700'
                    />
                ) : (
                    <p className=''>{formData.externalUrl}</p>
                )}
              </div>
              <button
                  className='p-2 rounded-full'
                  onClick={() =>
                      setEditingField(
                          editingField === 'externalUrl' ? null : 'externalUrl'
                      )
                  }
              >
                <PencilIcon className='h-6 w-6'/>
              </button>
            </div>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-medium mb-2'>관심사</h2>
                {editingField === 'interests' ? (
                    <input
                        type='text'
                        value={formData.interests}
                        onChange={(e) =>
                            handleInputChange('interests', e.target.value)
                        }
                        className='w-full border rounded-md p-2 bg-gray-100 dark:bg-gray-700'
                    />
                ) : (
                    <p className=''>{formData.interests}</p>
                )}
              </div>
              <button
                  className='p-2 rounded-full'
                  onClick={() =>
                      setEditingField(
                          editingField === 'interests' ? null : 'interests'
                      )
                  }
              >
                <PencilIcon className='h-6 w-6'/>
              </button>
            </div>
            <div className='flex justify-center'>
              <Button
                  onClick={() => setEditingField(null)}
                  className='font-semibold py-3 px-6 rounded-md'
              >
                모든 변경 사항 저장
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
